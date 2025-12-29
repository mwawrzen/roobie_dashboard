"use server";

import { ActionResponse } from "@/app/interfaces";
import { userService } from "@/services/user.service";
import { revalidateTag } from "next/cache";

export async function createUserAction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const name= formData.get( "email" ) as string;
    const password= formData.get( "password" ) as string;

    if( !name|| !password ) {
      return {
        success: false,
        message: "Email and password required"
      };
    }

    const user= await userService.create( name, password );
    revalidateTag( "users", "max" );

    return {
      success: true,
      message: "User successfully created"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while creating a user"
    };
  }
}

export async function editUserAction(
  id: number,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const email= formData.get( "email" ) as string;
    const password= formData.get( "password" ) as string;

    if( !email|| !password ) {
      return {
        success: false,
        message: "Email and password required"
      };
    }

    const user= await userService.update( id, email, password );
    revalidateTag( `user-${ user.id }`, "max" );
    return {
      success: true,
      message: "User successfully updated"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while updating a user"
    };
  }
}

export async function removeUserAction(
  userId: number
): Promise< ActionResponse > {
  try {
    await userService.delete( userId );
    revalidateTag( `user-${ userId }`, "max" );
    return {
      success: true,
      message: "User successfully removed"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while removing a user"
    };
  }
};
