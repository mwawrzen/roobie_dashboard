import { type NextRequest, NextResponse } from "next/server";

export function proxy( request: NextRequest ) {
  const hasToken= request.cookies.has( "auth" );
  const isLoginPage= request.nextUrl.pathname=== "/login";
  const isExpired= request.nextUrl.searchParams.get( "expired" )=== "true";

  if( isLoginPage&& isExpired&& hasToken ) {
    const response= NextResponse.next();
    response.cookies.delete( "auth" );
    return response;
  }

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
