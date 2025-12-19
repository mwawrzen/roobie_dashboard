import { userService } from "@/services/user.service";

export default async function UsersPage() {

  const users= await userService.getAll();

  return (
    <ul>
      {users.map(( user: any )=> (
        <li key={ user.id }>
          <p>id: { user.id }</p>
          <p>email: { user.email }</p>
          <p>role: { user.role }</p>
          <p>createdAt: { user.createdAt }</p>
        </li>
      ))}
    </ul>
  );
};
