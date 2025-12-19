"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error& { digest?: string },
  reset: ()=> void
}) {

  useEffect(() => {
    console.error( error );
  }, [ error ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 border-2 border-dashed border-red-200 rounded-xl p-8 bg-red-50">
      <h2 className="text-xl font-bold text-red-800 mb-4">
        Oops! Listing projects gone wrong...
      </h2>
      <p className="text-red-600 mb-6">{ error.message }</p>
      <Button
        onClick={ ()=> reset() }
        className="bg-red-600 hover:bg-red-700 cursor-pointer"
      >
        Try again
      </Button>
    </div>
  );
};
