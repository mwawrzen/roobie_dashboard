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
  } catch( e ) {
    return { error: "Error while adding variable" };
  }
};
