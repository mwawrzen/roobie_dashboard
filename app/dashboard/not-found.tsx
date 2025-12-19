import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="grow flex flex-col items-center justify-center gap-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        404 Not Found
      </h2>
      <Link href="/dashboard">
        <Button variant="outline">Return to Dashboard</Button>
      </Link>
    </main>
  );
};
