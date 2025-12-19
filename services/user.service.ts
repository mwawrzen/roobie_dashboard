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
  getAll: async (): Promise<User[]>=> {
    const res= await apiFetch( "/admin/user" );
    return res.json();
  },
  getById: async ( id: number ): Promise<User>=> {
    const res= await apiFetch( `/admin/user${ id }` );
    return res.json();
  }
};
