import { apiFetch } from "@/lib/api";

export interface Project {
  id: string;
  name: string;
  description?: string;
};

export const projectService= {
  getAll: async (): Promise<Project[]>=> {
    const res= await apiFetch( "/projects" );
    return res.json();
  },
  getById: async ( id: number ): Promise<Project>=> {
    const res= await apiFetch( `/project/${ id }` );
    return res.json();
  },
  delete: async ( id: number )=> {
    const res= await apiFetch( `/project/${ id }`, {
      method: "DELETE"
    });
    return res.json();
  }
};
