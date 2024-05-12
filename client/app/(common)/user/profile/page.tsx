import axios from "axios";
import { cookies } from "next/headers";


interface User {
    name: string,
    lastname: string,
    phone: string,
    country: string,
    street: string,
    city: string,
    postalcode: string
}

export default async function Profile() {
    try{
        const cookieStore = cookies();
        return await axios.post(process.env.SERVER + '/api/get_user', {token: cookieStore.get('authtoken')?.value})
            .then(res => {
                const user: User = res.data;
                console.log(user)
                return (
                    <div className="flex flex-col items-center justify-center gap-6">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Profil    
                        </h2>
                        <dl className="border-2 border-yellow-500 shadow-xl rounded-3xl border-round-lg p-6 w-full max-w-md text-gray-900 divide-y divide-gray-200">
                            <div className="flex flex-col pb-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Meno</dt>
                                <dd className="text-lg font-semibold">{user.name}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Priezvisko</dt>
                                <dd className="text-lg font-semibold">{user.lastname}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Telefón</dt>
                                <dd className="text-lg font-semibold">{user.phone}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Krajina</dt>
                                <dd className="text-lg font-semibold">{user.country}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Ulica</dt>
                                <dd className="text-lg font-semibold">{user.street}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">Mesto</dt>
                                <dd className="text-lg font-semibold">{user.city}</dd>
                            </div>
                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 text-md dark:text-gray-400">PSČ</dt>
                                <dd className="text-lg font-semibold">{user.postalcode}</dd>
                            </div>
                        </dl>
                    </div>
                );
            })
    }
    catch {() => {
        return (
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Hups, niečo sa pokazilo
                </h2>
            </div>
        );
    }}
}