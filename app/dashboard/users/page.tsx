import { authService } from "@/services/auth.service";
import { User, userService } from "@/services/user.service";
import { UsersList } from "@/components/users/users-list";

export default async function UsersPage() {

  const me: User= await authService.getMe();
  const users: User[]= await userService.getAll();

  const filteredUsers= users.filter( user=> user.id!== me.id );

  return (
    <UsersList users={ filteredUsers } />
  );
};
