import { User } from "@/services/user.service";
import { projectService } from "@/services/project.service";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import UserRow from "@/components/projects/user-row";
import UsersHeader from "./users-header";

export async function UsersList({ projectId }: { projectId: number }) {

  const projectUsers= await projectService.getProjectUsers( projectId );

  const userItems= projectUsers.map(( user: User )=> (
    <UserRow
      key={ user.id }
      user={ user }
      projectId={ projectId }
    />
  ));

  return (
    <>
      <UsersHeader />
      <div className="overflow-hidden rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>email</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { userItems }
          </TableBody>
        </Table>
      </div>
    </>
  );
}
