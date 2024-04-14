import { redirect } from 'next/navigation'

export default function User() {
    return redirect('/user/profile');
}