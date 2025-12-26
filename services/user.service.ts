import { apiFetch } from "@/lib/api";

export const USER_ROLES= [ "ADMIN", "EDITOR" ] as const;
export type USER_ROLE= typeof USER_ROLES[ number ];

export interface User {
  id: number;
  email: string;
  role: USER_ROLE;
  createdAt: string;
};

export const userService= {
  create: async ( email: string, password: string ): Promise<User>=> {
    const res= await apiFetch( "/admin/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      next: { tags: [ "users" ]}
    });
    return res.json();
  },
  getAll: async (): Promise<User[]>=> {
    const res= await apiFetch( "/admin/user" );
    return res.json();
  },
  getById: async ( id: number ): Promise<User>=> {
    const res= await apiFetch( `/admin/user${ id }` );
    return res.json();
  },
  update: async (
    id: number,
    email: string,
    password: string
  ): Promise<User>=> {
    const res= await apiFetch( `/admin/user/${ id }`, {
      method: "PATCH",
      body: JSON.stringify({ email, password }),
      next: { tags: [ `user-${ id }` ]}
    });
    return res.json();
  },
  delete: async ( id: number )=> {
    const res= await apiFetch( `/admin/user/${ id }`, {
      method: "DELETE",
      next: { tags: [ `user-${ id }` ]}
    })

    return res.text();
  }
};
