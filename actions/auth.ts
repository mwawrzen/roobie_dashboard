"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction( state: any, formData: FormData ) {

  let isSuccess: boolean= false;

  try {
    const email= formData.get( "email" );
    const password= formData.get( "password" );

    const res= await fetch( "http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if( !res.ok )
      return { error: "Wrong login data. Please try again." };

    const { token }= await res.json();

    const cookieStore= await cookies();
    cookieStore.set( "auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV=== "production",
      sameSite: "lax",
      path: "/"
    });

    isSuccess= true;
  } catch(_) {
    return { error: "Cannot connect to the server. Try again later." };
  }

  if( isSuccess )
    redirect( "/dashboard" );
};

export async function logoutAction() {

  const cookieStore= await cookies();
  cookieStore.delete( "auth" );

  redirect( "/login" );
};
