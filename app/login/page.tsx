"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/login/actions";
import { LoginForm } from "@/components/auth/login-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router= useRouter();
  const [ state, formAction, isPending ]= useActionState( loginAction, null );

  useEffect( ()=> {
    if( !state ) return;

    if( state.success ) {
      toast.success( state.message, { position: "top-center", duration: 1200 });
      router.push( "/dashboard" );
    } else {
      toast.error( state.message, { position: "top-center" });
    }
  }, [ state ]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm action={ formAction } isPending={ isPending } />
      </div>
    </div>
  );
};
