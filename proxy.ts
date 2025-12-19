import { type NextRequest, NextResponse } from "next/server";

export function proxy( request: NextRequest ) {
  const token= request.cookies.get( "auth" );

  if( !token&& request.nextUrl.pathname.startsWith( "/dashboard" ))
    return NextResponse.redirect( new URL( "/login", request.url ));

  if( token&& request.nextUrl.pathname=== "/login" )
    return NextResponse.redirect( new URL( "/dashboard", request.url ));

  return NextResponse.next();
};

export const config= {
  matcher: [ "/dashboard/:path*", "/login" ]
};
