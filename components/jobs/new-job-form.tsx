"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { createJob } from "@/lib/actions/jobs";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type NewJobPayload = {
  title: string;
  company: string;
  category: string;
  jobType: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};

// Figma "Post a New Job" form.
const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];
const CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Customer Support",
  "HR",
];
const FREQUENCIES = ["per hour", "per day", "per month", "per year"];

const inputClasses =
  "h-10 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-3 focus-visible:ring-indigo-500/20";
const sectionClasses = "rounded-2xl border border-white/10 bg-[#0F1116]/90 p-6";

const NewJobForm = ({
  onSubmit,
}: {
  onSubmit?: (data: NewJobPayload) => void | Promise<void>;
}) => {
  const [jobType, setJobType] = useState<JobType>("Full-time");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload: NewJobPayload = {
      title: String(formData.get("title") ?? ""),
      company: String(formData.get("company") ?? ""),
      category: String(formData.get("category") ?? ""),
      jobType,
      isRemote,
      location: String(formData.get("location") ?? ""),
      deadline: String(formData.get("deadline") ?? ""),
      minSalary: String(formData.get("minSalary") ?? ""),
      maxSalary: String(formData.get("maxSalary") ?? ""),
      frequency: String(formData.get("frequency") ?? ""),
      responsibilities: String(formData.get("responsibilities") ?? ""),
      requirements: String(formData.get("requirements") ?? ""),
    };

    console.log("[New Job] form data:", payload);

    try {
      const result = await createJob(payload);
      console.log("Job created:", result);
    } catch (error) {
      console.error("Create job failed:", error);
    }

    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 1. Basic Information */}
      <section className={sectionClasses}>
        <h2 className="text-sm font-medium text-white">1. Basic Information</h2>

        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="title" className="text-zinc-200">
            Job Title <span className="text-red-400">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Frontend Developer"
            className={inputClasses}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="company" className="text-zinc-200">
            Company Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="company"
            name="company"
            required
            placeholder="HirePulse Network"
            className={inputClasses}
          />
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="category" className="text-zinc-200">
              Job Category <span className="text-red-400">*</span>
            </Label>
            <NativeSelect
              required
              name="category"
              defaultValue={CATEGORIES[0]}
              className="w-full border-white/10 bg-white/[0.04] text-white focus-visible:border-indigo-500/50 [&>select]:h-10 [&>select]:rounded-xl [&>select]:border-white/10 [&>select]:bg-white/[0.04] [&>select]:text-white [&>select]:focus-visible:border-indigo-500/50"
            >
              {CATEGORIES.map((category) => (
                <NativeSelectOption key={category} value={category}>
                  {category}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-zinc-200">
              Job Type <span className="text-red-400">*</span>
            </Label>
            <ToggleGroup
              variant="outline"
              value={[jobType]}
              onValueChange={(value) => {
                if (value.length) setJobType(value[value.length - 1] as JobType);
              }}
              className="flex-wrap"
            >
              {JOB_TYPES.map((type) => (
                <ToggleGroupItem
                  key={type}
                  value={type}
                  className="rounded-lg border-white/10 text-zinc-300 hover:bg-white/[0.05] hover:text-white aria-pressed:border-indigo-500/60 aria-pressed:bg-indigo-500/15 aria-pressed:text-white"
                >
                  {type}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* 2. Location, Compensation & Timeline */}
      <section className={sectionClasses}>
        <h2 className="text-sm font-medium text-white">
          2. Location, Compensation &amp; Timeline
        </h2>

        <label className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-white">
              Remote Work Allowed
            </span>
            <span className="text-xs text-zinc-500">
              Enable worldwide or distributed candidate applications
            </span>
          </span>
          <Switch
            checked={isRemote}
            onCheckedChange={(checked) => setIsRemote(checked === true)}
            aria-label="Remote work allowed"
          />
        </label>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="location" className="text-zinc-200">
              Job Location <span className="text-red-400">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              required
              placeholder="New York, USA"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deadline" className="text-zinc-200">
              Application Deadline
            </Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              className={`${inputClasses} [color-scheme:dark]`}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="minSalary" className="text-zinc-200">
              Min Salary / Rate
            </Label>
            <Input
              id="minSalary"
              name="minSalary"
              type="number"
              min={0}
              placeholder="70,000"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="maxSalary" className="text-zinc-200">
              Max Salary / Rate
            </Label>
            <Input
              id="maxSalary"
              name="maxSalary"
              type="number"
              min={0}
              placeholder="120,000"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="frequency" className="text-zinc-200">
              Frequency
            </Label>
            <NativeSelect
              name="frequency"
              defaultValue={FREQUENCIES[0]}
              className="w-full [&>select]:h-10 [&>select]:rounded-xl [&>select]:border-white/10 [&>select]:bg-white/[0.04] [&>select]:text-white [&>select]:focus-visible:border-indigo-500/50"
            >
              {FREQUENCIES.map((frequency) => (
                <NativeSelectOption key={frequency} value={frequency}>
                  {frequency}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
      </section>

      {/* 3. Responsibilities & Requirements */}
      <section className={sectionClasses}>
        <h2 className="text-sm font-medium text-white">
          3. Responsibilities &amp; Requirements
        </h2>

        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="responsibilities" className="text-zinc-200">
            Key Responsibilities <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="responsibilities"
            name="responsibilities"
            required
            rows={5}
            placeholder="Describe what the person will be working on day to day..."
            className="min-h-32 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-3 focus-visible:ring-indigo-500/20"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="requirements" className="text-zinc-200">
            Qualifications &amp; Requirements <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="requirements"
            name="requirements"
            required
            rows={5}
            placeholder="Experience, skills and education the candidate must have..."
            className="min-h-32 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-3 focus-visible:ring-indigo-500/20"
          />
        </div>
      </section>

      {/* Publish (Figma has this button in the page header) */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="h-10 rounded-xl bg-indigo-500 px-6 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
        >
          Publish Job
        </Button>
      </div>
    </form>
  );
};

export default NewJobForm;
