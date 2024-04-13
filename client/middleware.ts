import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token: string | undefined = request.cookies.get('authtoken')?.value;
    if (token === undefined) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    else {
        console.log("ahoj");
        console.log(jwt.decode(token));
    }
}

export const config = {
    matcher: ['/user_zone', '/order'],
  }