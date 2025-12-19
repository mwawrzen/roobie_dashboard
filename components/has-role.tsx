import { authService } from "@/services/auth.service";

export async function HasRole({
  role,
  children
}: {
  role: string,
  children: React.ReactNode
}) {
  const user= await authService.getMe();

  if( user.role!== role )
    return null;

  return children;
};
