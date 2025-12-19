import { apiFetch } from "@/lib/api";

export const authService= {
  getMe: async ()=> {
    const res= await apiFetch( "/me" );
    return res.json();
  }
};
