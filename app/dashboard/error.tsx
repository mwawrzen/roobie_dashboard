"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error
}: {
  error: Error& { digest?: string }
}) {

  useEffect(() => {
    console.error( error );
  }, [ error ]);

  return (
    <main className="grow flex flex-col items-center justify-center gap-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Oops! Something went wrong...
      </h2>
      <p className="text-red-600 mb-6">{ error.message }</p>
      <Link href="/dashboard">
        <Button variant="outline">Return to Dashboard</Button>
      </Link>
    </main>
  );
};
