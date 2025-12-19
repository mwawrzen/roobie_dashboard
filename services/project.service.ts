import { apiFetch } from "@/lib/api";

export const PROJECT_STATUSES= [ "PLANNED", "ACTIVE", "ARCHIVED" ] as const;
export type PROJECT_STATUS= typeof PROJECT_STATUSES[ number ];

export interface Project {
  id: number;
  name: string;
  description: string| null;
  apiKey: string;
  status: PROJECT_STATUS;
  createdAt: string;
};

export interface Variable {
  id: number,
  key: string;
  value: string;
  projectId: number;
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
  },
  getVariablesById: async ( id: number ): Promise<Variable[]>=> {
    const res= await apiFetch( `/project/${ id }/variables` );
    return res.json();
  }
};
