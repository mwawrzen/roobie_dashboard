"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error& { digest?: string },
  reset: ()=> void
}) {

  const router= useRouter();

  const handleTryAgain= ()=> {
    startTransition( ()=> {
      router.refresh();
      reset();
    });
  };

  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Oops! Something went wrong...
      </h2>
      <p className="text-red-600 mb-6">{ error.message }</p>
      <Button variant="outline" onClick={ handleTryAgain }>Try again</Button>
    </main>
  );
};
