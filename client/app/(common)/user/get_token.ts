"use server";

import { cookies } from "next/headers";

export async function getToken() {
    const cookieStore = cookies();
    return cookieStore.get('authtoken')?.value;
}