import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function VariablesDialog({
  trigger,
  title
}: {
  trigger: React.ReactNode,
  title: string
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          { trigger }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{ title }</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
            <Input id="key" name="key" placeholder="key" />
            <Textarea id="value" name="value" placeholder="value" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
