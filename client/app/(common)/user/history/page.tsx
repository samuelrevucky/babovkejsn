import axios, { AxiosRequestConfig } from "axios";
import { server_address } from "@/config";
import { cookies } from "next/headers";


interface Order {
    id: number, 
    status: string,
    order_time: Date,
    order_deadline: Date,
    deposit_deadline: Date | null,
    price: number,
    paid: number,
    details: [{
        name: string,
        variants: {
            [key: string]: string
        },
        price: number,
        production_time: number,
        quantity: number
    }], 
    note: string
};

async function getOrders() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('authtoken');
        const axiosConfig: AxiosRequestConfig = {
            method: 'get',
            url: server_address + '/api/orders',
            withCredentials: true,
            headers: {
                Cookie: `authtoken=${cookieStore.get('authtoken')?.value}`
            }
        };

        return await axios(axiosConfig)
            .then(res => {
                if (res.data.length == 0) {
                    return (
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Nemáte zatiaľ žiadne objednávky
                            </h2>
                        </div>
                    );
                }
                else {
                    const orders: Order[] = res.data;
                    return (
                        <div className="w-full max-w-lg p-6 m-auto bg-white rounded-2xl border-2 shadow-lg flex flex-col">
                            <ul role="list" className="divide-y divide-gray-100">
                                {(() => {
                                    const items = [];
                                    for (let i = 0; i < orders.length; i++) {
                                        items.push(
                                            <li key={i} className="flex flex-col sm:flex-row justify-between gap-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">      
                                                    {JSON.stringify(orders[i])
                                                    /*Object.entries(orders[i]).map(([key, value]) => {
                                                        if (value !instanceof Array) {
                                                            return (
                                                                <div className="flex flex-col">
                                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                        {key}
                                                                    </p>
                                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                        {value}
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                        else {
                                                            return (
                                                                <div className="flex flex-col">
                                                                    {Object.entries(value).map(([variantType, typeValue]) => {
                                                                        return (
                                                                            <div>
                                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                                    {variantType}
                                                                                </p>
                                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                                    {typeValue as string}
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            );
                                                        }
                                                    })*/}
                                                </div>
                                            </li>
                                        )
                                    }
                                    return items;
                                })()}
                            </ul>
                        </div>
                    );
                }
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

export default async function History() {
    return await getOrders();
}