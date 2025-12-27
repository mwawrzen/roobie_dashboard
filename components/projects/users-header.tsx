"use client";

import { IconPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";

export default function UsersHeader() {
  return (
    <header className="my-4">
      <Button
        variant="secondary"
        size="default"
        onClick={ ()=> {} }
      >
        <IconPlus />
        Add
      </Button>
    </header>
  );
}
