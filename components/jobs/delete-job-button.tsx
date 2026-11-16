"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteJob } from "@/lib/actions/jobs";
import { useState } from "react";
import { toast } from "@/components/ui/toast";

const DeleteJobButton = ({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteJob(jobId);
    console.log("Job deleted:",jobId, res);
    if(res.deletedCount){
      setOpen(false);
      toast.add({
        title: "Job deleted",
        description: `The job "${jobTitle}" has been deleted.`,
      });
      router.refresh(); // Refresh the page to reflect the deletion
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Delete ${jobTitle}`}
            className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={14} />
          </Button>
        }
      />
      <AlertDialogContent className="border-white/10 bg-[#0F1116]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Delete this job post?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            &ldquo;{jobTitle}&rdquo; will be permanently removed. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-8 rounded-lg border-white/10 bg-transparent px-3 text-xs text-zinc-200 hover:bg-white/[0.05] hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="h-8 rounded-lg bg-red-500 px-3 text-xs text-white hover:bg-red-400"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobButton;
