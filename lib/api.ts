import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL= "http://localhost:3001/api/v1";

const messages: Record<string, string>= {
  "401": "You have to be logged in",
  "403": "You don't have access to this resource",
  "404": "Resource not found"
};

export async function apiFetch( endpoint: string, options: RequestInit= {}) {
  try {
    const cookieStore= await cookies();
    const token= cookieStore.get( "auth" )?.value;

    const headers= {
      "Content-Type": "application/json",
      ...options.headers,
      ...( token? { "Cookie": `auth=${ token }` }: {})
    };

    const response= await fetch( `${ API_URL}${ endpoint }`, {
      ...options,
      headers
    });

    if( !response.ok ) {
      if( response.status=== 401 )
        redirect( "/login?expired=true" );
      throw new Error(
        messages[ String( response.status )]||
        `Server error: ${ response.status }`
      );
    }

    return response;
  } catch( error: any ) {
    if( error.message=== "fetch failed" )
      throw new Error( "Connection error" );
  }
};
