import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  action,
  isPending,
  className,
  ...props
}:
  React.ComponentProps<"div"> &
  React.ComponentProps<"form"> &
  { isPending: boolean }
) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Roobie CMS</CardTitle>
          <CardDescription>
            Welcome to Roobie Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={ action }>
            <FieldGroup className="gap-2">
              <Field>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  autoComplete="current-email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="mt-4">
                  { isPending? "Logging in...": "Login" }
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
