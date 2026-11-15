import type { Metadata } from "next";
import Link from "next/link";

import NewJobForm from "@/components/jobs/new-job-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Post a New Job — HireLoop",
};

const NewJobPage = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/dashboard/recruiter/jobs" />}>
              Manage Jobs
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New Listing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Post a New Job
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Fill in the position specifications to attract qualified talent
          across our network.
        </p>
      </div>

      <div className="mt-6">
        <NewJobForm />
      </div>
    </div>
  );
};

export default NewJobPage;
