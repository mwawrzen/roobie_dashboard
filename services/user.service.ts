import { apiFetch } from "@/lib/api";

export const userService= {
  getAll: async ()=> {
    const res= await apiFetch( "/admin/user" );
    return res.json();
  },
  getById: async ( id: number )=> {
    const res= await apiFetch( `/admin/user${ id }` );
    return res.json();
  }
};
