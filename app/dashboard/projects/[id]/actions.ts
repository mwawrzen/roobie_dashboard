"use server";

import { projectService } from "@/services/project.service";
import { revalidatePath } from "next/cache";

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
    revalidatePath( `/dashboard/projects/${ projectId }` );
    return { success: true };
  } catch(_) {
    return { error: "Error while adding variable" };
  }
};

export async function removeVariableAction( projectId: number, key: string ) {
  try {
    await projectService.removeVariable( projectId, key );
    revalidatePath( `/dashboard/projects/${ projectId }` );
    return { success: true };
  } catch(_) {
    return { error: "Error while removing variable" };
  }
};
