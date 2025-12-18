import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Roobie CMS</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block hover:text-blue-400">Statistics</Link>
          <Link href="/dashboard/projects" className="block hover:text-blue-400">Projects</Link>
          <Link href="/dashboard/users" className="block hover:text-blue-400">Users</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        { children }
      </main>
    </div>
  );
};
