"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerUser } from "@/services/auth/registerUser";
import InputFieldError from "../InputFieldError";
import { LoadingSpinner } from "../shared/Spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className={cn("flex flex-col px-5", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex items-center gap-5 flex-col md:flex-row">
          {/* First Name field  */}
          <Field>
            <FieldLabel htmlFor="firstName">
              First Name
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="firstName"
              id="firstName"
              type="text"
              placeholder="First Name"
            />

            <InputFieldError field="firstName" state={state} />
          </Field>

          {/* Last Name field  */}
          <Field>
            <FieldLabel htmlFor="lastName">
              Last Name
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Last Name"
            />

            <InputFieldError field="lastName" state={state} />
          </Field>
        </div>

        {/* email field  */}
        <Field>
          <FieldLabel htmlFor="email">
            Email <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Your Email"
          />

          <InputFieldError field="email" state={state} />
        </Field>

        <div className="flex items-center flex-col md:flex-row gap-5">
          {/* password field  */}
          <Field>
            <FieldLabel htmlFor="password">
              Password<span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Type Secure password"
            />

            <InputFieldError field="password" state={state} />
          </Field>

          {/* confirm password  */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm Password<span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />

            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>

        <Field>
          <Button className="py-5 text-lg cursor-pointer" type="submit" disabled={isPending}>
            {isPending ? <span className="flex items-center gap-3"><LoadingSpinner /> Creating ...</span> : "Create Account"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href={"/login"}>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

