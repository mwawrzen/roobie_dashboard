"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/auth";
import { LoginForm } from "@/components/auth/login-form";
import { toast } from "sonner";

export default function LoginPage() {
  const [ state, formAction, isPending ]= useActionState( loginAction, null );

  useEffect( ()=> {
    if( state?.error )
      toast.error( state.error );
  }, [ state ]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm action={ formAction } isPending={ isPending } />
      </div>
    </div>
  );
};
