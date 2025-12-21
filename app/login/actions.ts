"use server";

import { ActionResponse } from "@/app/interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  _state: any,
  formData: FormData
): Promise< ActionResponse > {
  try {
    const email= formData.get( "email" )?.toString().trim();
    const password= formData.get( "password" )?.toString().trim();

    if( !email|| !password ) {
      return {
        success: false,
        message: "Email and password are required"
      };
    }

    const res= await fetch( "http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if( res.status=== 401 ) {
      return {
        success: false,
        message: "Wrong login data. Please try again."
      };
    }

    if( !res.ok ) {
      return {
        success: false,
        message: "Error while logging in"
      };
    }

    const { token }= await res.json();

    const cookieStore= await cookies();

    cookieStore.set( "auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV=== "production",
      sameSite: "lax",
      path: "/"
    });

    return {
      success: true,
      message: "Successfully logged in"
    };
  } catch( error ) {
    console.error( error );
    return {
      success: false,
      message: "Cannot connect to the server. Try again later"
    };
  }
};

export async function logoutAction() {

  const cookieStore= await cookies();
  cookieStore.delete( "auth" );

  redirect( "/login" );
};
