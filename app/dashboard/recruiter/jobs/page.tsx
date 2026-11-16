import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Code,
  FlaskConical,
  MapPin,
  Megaphone,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Server,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { NewJobPayload } from "@/components/jobs/new-job-form";
import DeleteJobButton from "@/components/jobs/delete-job-button";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getJobs } from "@/lib/api/jobs";

export const metadata: Metadata = {
  title: "Manage Job Posts — HireLoop",
};

/**
 * A stored job post (what the New Job form saves) plus the display-only
 * fields the table needs. Maps 1:1 to the API response once normalized by
 * `toJobPost`.
 */
export type JobPost = NewJobPayload & {
  id: string;
  applicants: number;
  status: "Active" | "Paused" | "Expired";
  postedLabel: string;
};

/** Raw document shape returned by GET /jobs (Mongo fields + `_id`). */
type ApiJobDoc = Record<string, unknown>;

/**
 * Normalizes a raw API document into the `JobPost` display shape, deriving
 * display-only fields the API does not store yet.
 */
const toJobPost = (doc: ApiJobDoc): JobPost => {
  const str = (key: string, fallback = "") => {
    const value = doc[key];
    return typeof value === "string" && value.length > 0 ? value : fallback;
  };
  const deadline = str("deadline");
  const isPast =
    deadline.length > 0 && new Date(deadline).getTime() < Date.now();
  const rawStatus = str("status") as JobPost["status"] | "";

  return {
    id: String(doc._id ?? ""),
    title: str("title", "Untitled role"),
    company: str("company", "—"),
    category: str("category", "Other"),
    jobType: str("jobType", "Full-time") as NewJobPayload["jobType"],
    isRemote: doc.isRemote === true,
    location: str("location", "—"),
    deadline,
    minSalary: str("minSalary", "0"),
    maxSalary: str("maxSalary", "0"),
    frequency: str("frequency", "per year"),
    responsibilities: str("responsibilities", "—"),
    requirements: str("requirements", "—"),
    applicants: typeof doc.applicants === "number" ? doc.applicants : 0,
    status: rawStatus || (isPast ? "Expired" : "Active"),
    postedLabel: str("postedLabel", "—"),
  };
};

// Figma table: each category gets a colored icon tile.
const categoryMeta: Record<string, { icon: LucideIcon; box: string }> = {
  "Engineering & Tech": {
    icon: Code,
    box: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  },
  Design: {
    icon: Palette,
    box: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  },
  Infrastructure: {
    icon: Server,
    box: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  },
  Marketing: {
    icon: Megaphone,
    box: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  },
  Quality: {
    icon: FlaskConical,
    box: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  },
};
const fallbackCategoryMeta = {
  icon: Briefcase,
  box: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
};

const typeBadgeClasses =
  "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-zinc-300";
const statusClasses: Record<JobPost["status"], string> = {
  Active: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  Paused: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  Expired: "border-zinc-500/30 bg-zinc-500/15 text-zinc-400",
};

const formatCompensation = (min: string, max: string, frequency: string) => {
  const short = (value: string) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return "—";
    return num >= 1000 ? `€${Math.round(num / 1000)}k` : `€${num}`;
  };
  return `${short(min)} – ${short(max)} ${frequency.replace("per ", "/ ")}`;
};

const formatDeadline = (deadline: string) => {
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ManageJobsPage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard/recruiter" />}>
              Manage Jobs
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Job Listings &amp; Postings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className="h-10 rounded-xl bg-indigo-500 px-5 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
        >
          <Plus size={16} /> New Job Post
        </Button>
      </div>

      {/* The uncached GET /jobs fetch lives inside <Suspense> so the page
          shell can still prerender and the table streams in. */}
      <Suspense fallback={<JobsTableSkeleton />}>
        <JobsTable />
      </Suspense>
    </div>
  );
};

const JobsTableSkeleton = () => (
  <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0F1116]/90 p-6">
    {Array.from({ length: 5 }, (_, i) => (
      <div key={`skeleton-${i}`} className="h-10 animate-pulse rounded-lg bg-white/[0.05]" />
    ))}
  </div>
);

const JobsTable = async () => {
  let docs: ApiJobDoc[];
  try {
    const result = await getJobs();
    if (!Array.isArray(result)) {
      throw new Error("Unexpected /jobs response shape");
    }
    docs = result;
  } catch (error) {
    console.error("Failed to load jobs:", error);
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0F1116]/90 p-10 text-center text-sm text-zinc-400">
        Couldn&apos;t load job posts. Make sure the jobs API is running.
      </div>
    );
  }

  const jobs = docs.map(toJobPost);

  // Responsive: columns fold away on small screens, and the whole table
  // scrolls horizontally as a safety net on very narrow viewports.
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#0F1116]/90">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-xs font-semibold tracking-wide text-zinc-400">
              JOB TITLE &amp; DEPT
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide text-zinc-400">
              COMPANY &amp; LOCATION
            </TableHead>
            <TableHead className="hidden text-xs font-semibold tracking-wide text-zinc-400 md:table-cell">
              TYPE
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide text-zinc-400">
              COMPENSATION
            </TableHead>
            <TableHead className="hidden text-xs font-semibold tracking-wide text-zinc-400 lg:table-cell">
              APPLICANTS
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide text-zinc-400">
              STATUS
            </TableHead>
            <TableHead className="hidden text-xs font-semibold tracking-wide text-zinc-400 sm:table-cell">
              DEADLINE
            </TableHead>
            <TableHead className="text-right text-xs font-semibold tracking-wide text-zinc-400">
              ACTIONS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={8} className="py-10 text-center text-sm text-zinc-500">
                No job posts yet.{" "}
                <Link
                  href="/dashboard/recruiter/jobs/new"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Create your first one
                </Link>
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => {
              const meta = categoryMeta[job.category] ?? fallbackCategoryMeta;
              return (
                <TableRow
                  key={job.id}
                  className="border-white/10 hover:bg-white/[0.03]"
                >
                  <TableCell className="py-4 align-top">
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg border ${meta.box}`}
                      >
                        <meta.icon size={16} />
                      </span>
                      <div>
                        <div className="font-semibold text-white">
                          {job.title}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-500">
                          {job.category}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="inline-flex items-center gap-1.5 font-medium text-zinc-200">
                      <Building2 size={14} className="text-zinc-500" />
                      {job.company}
                    </div>
                    <div className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <MapPin size={12} />
                      {job.isRemote ? `Remote (${job.location})` : job.location}
                    </div>
                  </TableCell>

                  <TableCell className="hidden align-top md:table-cell">
                    <span className={typeBadgeClasses}>{job.jobType}</span>
                  </TableCell>

                  <TableCell className="align-top font-medium whitespace-nowrap text-zinc-200">
                    {formatCompensation(
                      job.minSalary,
                      job.maxSalary,
                      job.frequency,
                    )}
                  </TableCell>

                  <TableCell className="hidden align-top lg:table-cell">
                    <span className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-indigo-300">
                      <Users size={14} /> {job.applicants} Candidates
                    </span>
                  </TableCell>

                  <TableCell className="align-top">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClasses[job.status]}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {job.status}
                    </span>
                  </TableCell>

                  <TableCell className="hidden align-top sm:table-cell">
                    <div className="font-medium whitespace-nowrap text-zinc-200">
                      {formatDeadline(job.deadline)}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-500">
                      {job.postedLabel}
                    </div>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="outline"
                        className="h-8 rounded-lg border-indigo-500/40 bg-indigo-500/15 px-3 text-xs text-indigo-300 hover:bg-indigo-500/25 hover:text-indigo-200"
                      >
                        <Pencil size={12} /> Update
                      </Button>
                      <DeleteJobButton jobId={job.id} jobTitle={job.title} />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`More options for ${job.title}`}
                        className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                      >
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageJobsPage;
