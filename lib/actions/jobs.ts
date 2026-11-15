import { NewJobPayload } from "@/components/jobs/new-job-form";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";


export const createJob = async (data: NewJobPayload) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`Failed to create job (${res.status})`);
    }
    return res.json();
}