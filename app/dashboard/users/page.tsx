import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { User, userService } from "@/services/user.service";

function UserItem({ user }: { user: User }) {

  const { id, email, role, createdAt }= user;

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle className="text-lg">{ email }</ItemTitle>
        <ItemDescription className="text-xs">
          { role } | { createdAt }
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">Manage</Button>
      </ItemActions>
    </Item>
  );
}

export default async function UsersPage() {

  const users: User[]= await userService.getAll();
  const userItems= users.map( user=> (
    <UserItem key={ user.id } user={ user } />
  ));

  return (
    <main className="flex flex-col gap-2">
      { userItems }
    </main>
  );
};
