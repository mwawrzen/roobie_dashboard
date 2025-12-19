import { cookies } from "next/headers";

const API_URL= "http://localhost:3001/api/v1";

export async function apiFetch( endpoint: string, options: RequestInit= {}) {
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

  if( !response.ok )
    throw new Error( `Server error: ${ response.status }` );

  return response;
};
