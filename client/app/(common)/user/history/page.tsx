import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";


interface Order {
    id: number, 
    status: string,
    order_time: Date | string,
    order_deadline: Date | string,
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

const slovakMapping: {[key: string]: string} = {
    id: "Číslo objednávky",
    status: "Stav objednávky",
    order_time: "Dátum objednávky",
    order_deadline: "Dátum vyzdvihnutia",
    deposit_deadline: "Dátum na zaplatenie zálohy",
    price: "Celková cena",
    paid: "Zaplatené",
    note: "Poznámka"
}

async function getOrders() {
    try {
        const cookieStore = cookies();
        return await axios.post(process.env.SERVER + '/api/orders', {token: cookieStore.get('authtoken')?.value})
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
                    orders.map(order => {
                        const parts = (order.order_deadline as unknown as string).split('T')[0].split('-');
                        order.order_deadline = `${parts[2]}.${parts[1]}.${parts[0]}`;
                        const parts2 = (order.order_time as unknown as string).split('T');
                        const parts2_date = parts2[0].split('-');
                        const parts2_time = parts2[1].split('.')[0];
                        order.order_time = `${parts[2]}.${parts[1]}.${parts[0]} ${parts2_time}`;
                    })
                    return (
                        <div className="p-6 mx-5 bg-white rounded-2xl border-2 shadow-lg flex flex-col">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm border-b mb-4 pb-3 border-gray-300">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    História vašich objednávok
                                </h2>
                            </div>
                            <ul role="list" className="w-full flex flex-col divide-y divide-gray-300">
                                {(() => {
                                    const items = [];
                                    for (let i = 0; i < orders.length; i++) {
                                        items.push(
                                            <li key={i} className="flex flex-col justify-between gap-6 py-5">
                                                <div className="flex flex-wrap gap-4">      
                                                    {Object.entries(orders[i]).slice(0, -2).map(([key, value]) => {
                                                        
                                                            return (
                                                                <div className="flex flex-col border border-yellow-500 rounded-2xl p-4">
                                                                    <p className="mt-1 truncate text-sm font-semibold leading-5 text-gray-900">
                                                                        {slovakMapping[key]}
                                                                    </p>
                                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                        {value}
                                                                    </p>
                                                                </div>
                                                            );
                                                    })}
                                                </div>
                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex flex-col gap-4 border border-yellow-500 rounded-2xl p-4">
                                                        <p className="mt-1 truncate text-sm font-semibold leading-5 text-gray-900">
                                                            Produkty
                                                        </p>
                                                        <ul className="w-full flex flex-col divide-y divide-gray-300">
                                                            {(() => {
                                                                const orderItems = [];
                                                                for (let product of orders[i].details) {
                                                                    orderItems.push(
                                                                        <li className="flex flex-wrap gap-3 divide-x divide-gray-300 py-3">
                                                                            <p className="mt-1 truncate text-sm leading-5 text-gray-900">
                                                                                {product.name}
                                                                            </p>
                                                                            <ul className="pl-3">
                                                                            {Object.entries(product.variants).map(([variantType, typeValue]) => {
                                                                                return (
                                                                                    <li className="flex">
                                                                                        <p className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500 flex">{variantType}</p>
                                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"><span>:&nbsp;</span></p> 
                                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{typeValue}</p>
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                            </ul>
                                                                            <div className="flex flex-col items-end pl-3">
                                                                                <p className="mt-1 truncate text-sm font-semibold leading-5 text-gray-500">
                                                                                    Cena
                                                                                </p>
                                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                                    {product.price}
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex flex-col items-end pl-3">
                                                                                <p className="mt-1 truncate text-sm font-semibold leading-5 text-gray-500">
                                                                                    Množstvo
                                                                                </p>
                                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                                    {product.quantity}
                                                                                </p>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                }
                                                                return orderItems;
                                                            })()}
                                                        </ul>
                                                    </div>
                                                    <div className="flex flex-col border border-yellow-500 rounded-2xl p-4">
                                                        <p className="mt-1 truncate text-sm font-semibold leading-5 text-gray-900">Poznámka</p>
                                                        <p className="mt-1 text-md leading-5 text-gray-500">{orders[i].note}</p>
                                                    </div>
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