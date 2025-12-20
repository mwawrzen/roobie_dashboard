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
                {/* <FieldLabel htmlFor="email">Email</FieldLabel> */}
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
                  {/* <FieldLabel htmlFor="password">Password</FieldLabel> */}
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
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
                {/* <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription> */}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
