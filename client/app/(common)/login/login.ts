"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(email: string, password: string, rememberMe: boolean) {
    "use server";
    const cookieStore = cookies();
    await axios.post(process.env.SERVER + '/api/authenticate', {
        email: email,
        password: password,
        rememberMe: rememberMe
    }, { 
        withCredentials: true,
    })
    .then((response) => {
        if (response.data.authenticated) {
            cookieStore.set('authtoken', response.data.token, {
                maxAge: rememberMe ? 3600*24*30 : 3600,
                path: '/',
                sameSite: 'lax',
                secure: true,
                httpOnly: true
            })
            redirect("/user/profile");
        }
        else {
            throw Error;
        }
    })
}