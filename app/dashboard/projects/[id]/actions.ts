"use server";

import { ActionResponse } from "@/app/interfaces";
import { projectService } from "@/services/project.service";
import { revalidateTag } from "next/cache";

export async function addVariableAction(
  projectId: number,
  formData: FormData
): Promise< ActionResponse > {
  try {
    const key= formData.get( "key" ) as string;
    const value= formData.get( "value" ) as string;

    if( !key|| !value ) {
      return {
        success: false,
        message: "Key and value required"
      };
    }

    await projectService.addVariable( projectId, key, value );
    revalidateTag( `variables-${ projectId }`, "max" );
    return {
      success: true,
      message: "Variable successfully added"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while adding variable"
    };
  }
};

export async function removeVariableAction(
  projectId: number,
  key: string
): Promise< ActionResponse > {
  try {
    await projectService.removeVariable( projectId, key );
    revalidateTag( `variables-${ projectId }`, "max" );
    return {
      success: true,
      message: "Variable successfully removed"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while removing variable"
    };
  }
};

export async function editVariableAction(
  projectId: number,
  formData: FormData
): Promise< ActionResponse > {
  try {
    const key= formData.get( "key" )?.toString().trim();
    const value= formData.get( "value" )?.toString().trim();

    if( !key|| !value ) {
      return {
        success: false,
        message: "Key and value required"
      };
    }

    await projectService.editVariable( projectId, key, value );
    revalidateTag( `variables-${ projectId }`, "max" );
    return {
      success: true,
      message: "Variable successfully edited"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while editing variable"
    };
  }
};

export async function setProjectUserAction(
  projectId: number,
  userId: number
): Promise< ActionResponse > {
  try {
    await projectService.setProjectUser( projectId, userId );
    // revalidateTag( `variables-${ projectId }`, "max" );
    return {
      success: true,
      message: "Project user successfully set"
    };
  } catch(_) {
    return {
      success: false,
      message: "Error while setting project user"
    };
  }
};
