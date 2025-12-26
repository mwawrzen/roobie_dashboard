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
  create: async ( name: string, description: string ): Promise<Project>=> {
    const res= await apiFetch( "/admin/project", {
      method: "POST",
      body: JSON.stringify({ name, description })
    });

    return res.json();
  },
  getAll: async (): Promise<Project[]>=> {
    const res= await apiFetch( "/projects" );
    return res.json();
  },
  getById: async ( id: number ): Promise<Project>=> {
    const res= await apiFetch( `/project/${ id }` );
    return res.json();
  },
  update: async ( id: number, name: string, description: string )=> {
    return { id: 0 }; //! todo
  },
  delete: async ( id: number )=> {
    const res= await apiFetch( `/project/${ id }`, {
      method: "DELETE",
      next: { tags: [ `project-${ id }` ]}
    });
    return res.text();
  },
  addVariable: async ( projectId: number, key: string, value: string )=> {
    const res= await apiFetch( `/project/${ projectId }/variable`, {
      method: "POST",
      body: JSON.stringify({ key, value })
    });
    return res.json();
  },
  getVariablesById: async ( id: number ): Promise<Variable[]>=> {
    const res= await apiFetch( `/project/${ id }/variable`, {
      next: { tags: [ `variables-${ id }` ]}
    });
    return res.json();
  },
  removeVariable: async ( projectId: number, key: string )=> {
    await apiFetch( `/project/${ projectId }/variable/${ key }`, {
      method: "DELETE"
    });
  },
  editVariable: async ( projectId: number, key: string, value: string )=> {
    const res= await apiFetch( `/project/${ projectId }/variable`, {
      method: "PUT",
      body: JSON.stringify({ key, value })
    });
    return res.json();
  }
};
