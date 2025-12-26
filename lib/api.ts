import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL= "http://localhost:3001/api/v1";

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
      throw new Error( response.statusText );
    }

    return response;
  } catch( error: any ) {
    console.error( error );
    if( error.cause?.code=== "ECONNREFUSED" )
      throw new Error( "Connection error" );
    throw error;
  }
};
