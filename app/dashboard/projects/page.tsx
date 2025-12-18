import { cookies } from "next/headers";

export default async function ProjectsPage() {
  const cookieStore= await cookies();
  const token= cookieStore.get( "auth" )?.value;

  const res= await fetch( "http://localhost:3001/api/v1/projects", {
    headers: {
      "Cookie": `auth=${ token }`
    }
  });

  if( res.status=== 401 ) return <p>You must be logged in!</p>;
  if( res.status=== 403 ) return <p>You have no privilege to see projects list</p>;

  const projects= await res.json();

  return (
    <main>
      <h1>Your projects</h1>
      <ul>
        { projects.map(( p: any )=> <li key={p.id}>{p.name}</li> )}
      </ul>
    </main>
  );
};
