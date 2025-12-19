import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { projectService } from "@/services/project.service";

import data from "./data.json";

export default async function DashboardPage() {
  const projects= await projectService.getAll();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={ data } />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //       <div className="bg-white p-6 rounded-xl shadow-sm border">
  //         <p className="text-sm text-gray-500 uppercase font-semibold">
  //           All projects
  //         </p>
  //         <p className="text-4xl font-bold mt-2">{ projects.length }</p>
  //       </div>
  //     </div>
  //     <h2 className="text-xl font-bold mt-10 mb-4 text-gray-700">
  //       Last projects
  //     </h2>
  //     <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
  //       <table className="w-full text-left">
  //         <thead className="bg-gray-50 border-b">
  //           <tr>
  //             <th className="p-4 font-semibold text-gray-600">Project name</th>
  //             <th className="p-4 font-semibold text-gray-600">ID</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {projects.map((project: any) => (
  //             <tr key={project.id} className="border-b hover:bg-gray-50">
  //               <td className="p-4 text-gray-800">{project.name}</td>
  //               <td className="p-4 text-sm text-gray-500">#{project.id}</td>
  //             </tr>
  //           ))}
  //           {projects.length === 0 && (
  //             <tr>
  //               <td colSpan={2} className="p-10 text-center text-gray-400 italic">
  //                 No projects
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};
