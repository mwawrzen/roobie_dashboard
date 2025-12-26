"use server";

import { ActionResponse } from "@/app/interfaces";
import { projectService } from "@/services/project.service";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createProjectAction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const name= formData.get( "name" ) as string;
    const description= formData.get( "description" ) as string;

    if( !name ) {
      return {
        success: false,
        message: "Name required"
      };
    }

    const project= await projectService.create( name, description );
    revalidateTag( "projects", "max" );

    return {
      success: true,
      message: "Project successfully created"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while creating a project"
    };
  }
}

export async function editProjectAction(
  projectId: number,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const name= formData.get( "name" ) as string;
    const description= formData.get( "description" ) as string;

    if( !name ) {
      return {
        success: false,
        message: "Name required"
      };
    }

    const project= await projectService.update( projectId, name, description );
    revalidateTag( `project-${ project.id }`, "max" );
    return {
      success: true,
      message: "Project successfully updated"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while updating a project"
    };
  }
}

export async function removeProjectAction(
  projectId: number
): Promise< ActionResponse > {
  try {
    await projectService.delete( projectId );
    revalidateTag( `project-${ projectId }`, "max" );
    return {
      success: true,
      message: "Project successfully removed"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while removing a project"
    };
  }
};
