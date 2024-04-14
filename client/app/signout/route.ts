import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  const cookieStore = cookies()
  if (cookieStore.has('authtoken')) {
    cookieStore.delete('authtoken');
  }
  redirect('login');
}