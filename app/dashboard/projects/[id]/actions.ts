"use server";

import { projectService } from "@/services/project.service";
import { revalidateTag } from "next/cache";

export async function addVariableAction(
  projectId: number,
  prevState: any,
  formData: FormData
) {
  const key= formData.get( "key" ) as string;
  const value= formData.get( "value" ) as string;

  if( !key|| !value )
    return { error: "Key and value required" };

  try {
    await projectService.addVariable( projectId, key, value );
    revalidateTag( `variables-${ projectId }`, "max" );
    return { success: true };
  } catch(_) {
    return { error: "Error while adding variable" };
  }
};

export async function removeVariableAction( projectId: number, key: string ) {
  try {
    await projectService.removeVariable( projectId, key );
    revalidateTag( `variables-${ projectId }`, "max" );
    return {
      success: true,
      message: "Variable successfully removed"
    };
  } catch( e: any ) {
    return {
      success: false,
      message: "Error while removing variable"
    };
  }
};

export async function editVariableAction(
  projectId: number,
  prevState: any,
  formData: FormData
) {
  const key= formData.get( "key" ) as string;
  const value= formData.get( "value" ) as string;

  if( !key|| !value )
    return { error: "Key and value required" };

  try {
    await projectService.editVariable( projectId, key, value );
    revalidateTag( `variables-${ projectId }`, "max" );
    return { success: true };
  } catch(_) {
    return { error: "Error while editing variable" };
  }
};
