"use client";

import Calendar from "./calendar";
import Selector from "./selector";
import { useState } from "react";
import { Product, Day } from "./page";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/20/solid";


export interface cartItem {
    name: string,
    variants: {
        [key: string]: string
    }
    price: number,
    production_time: number,
    quantity: number
};

export default function Order({ products, days }: { products: Product[], days: Day[][] }) {

    // cart logic
    
    const [cart, setCart] = useState(Array<[cartItem, number]>);
    const [selectedDate, setSelectedDate] = useState<Day>();
    const [note, setNote] = useState('');
    
    const handleCartInput = (c: cartItem) => {
        setCart(oldCart => {
            if (oldCart.length == 0) {
                const newCart: [cartItem, number][] = [[c, 0]];
                return newCart;
            }
            if (oldCart.length < 5) {
                const newCart: [cartItem, number][] = [...oldCart, [c, oldCart[oldCart.length-1][1] + 1]];
                return newCart;
            }
            else return oldCart;
        });
    };
    const handleDeleteItem = (id: number) => {
        setCart(oldCart => {
            const newCart = oldCart.filter((item) => item[1] !== id);
            return newCart;
          });
    };
    const handleDecreaseQuantity = (id: number) => {
        const i = cart.findIndex(item => item[1] === id);
        if (cart[i][0].quantity === 1) {
            handleDeleteItem(id);
        }
        else {
            cart[i][0].quantity--;
            setCart([...cart]);
        }
    };
    const handleIncreaseQuantity = (id: number) => {
        const i = cart.findIndex(item => item[1] === id);
        if (cart[i][0].quantity < 10) {
            cart[i][0].quantity++;
            setCart([...cart]);
        }
    };
    const handleSelectDate = (d: Day | undefined) => {
        setSelectedDate(d);
    };
    const handleNoteChange = (e: any) => {
        setNote(e.target.value);
        console.log(note);
    };
    const handleOrderSubmit = () => {
        
    };

    let totalPrice: number = cart.reduce((acc, [cartItem, i]) => (acc + cartItem.price * cartItem.quantity), 0);
    let totalProductionTime: number = cart.reduce((acc, [cartItem, i]) => {
        let q = 1;
        if (cartItem.quantity > 1) q = 0.5;
        return acc + cartItem.production_time * cartItem.quantity * q;
    }, 0);

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className='w-full flex flex-col lg:flex-row'>
                <Selector
                    products={products} 
                    handleCartInput={handleCartInput}
                />
                <div className="flex flex-col mx-auto w-full lg:w-1/2 gap-4">
                    <div className={`${cart.length === 0 ? 'hidden' : ''} w-full max-w-lg p-6 m-auto bg-white rounded-2xl border-2 shadow-lg flex flex-col`}>
                        <ul role="list" className="divide-y divide-gray-100">
                            {(() => {
                                const items = [];
                                for (let i = 0; i < cart.length; i++) {
                                    const cartItem = cart[i];
                                    items.push(
                                        <li key={i} className="flex flex-col sm:flex-row justify-between gap-6 py-5">
                                            <div className="flex min-w-0 gap-x-4">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{cartItem[0].name}</p>
                                                <div>
                                                {Object.entries(cartItem[0].variants).map(([key, value]) => (
                                                    <p key={key} className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {key}: {value}
                                                    </p>
                                                ))}
                                                </div>
                                            </div>
                                            <div className="flex h-min justify-center gap-x-4">
                                                <div className="max-w-xs mx-auto">
                                                    <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Množstvo:</label>
                                                    <div className="relative flex items-center max-w-[8rem]">
                                                        <button type="button" 
                                                            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-2 h-7 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                            onClick={() => (handleDecreaseQuantity(cartItem[1]))}>
                                                            <MinusIcon className="w-5 h-5 text-gray-900 dark:text-white"/>
                                                        </button>
                                                        <input type="text"
                                                            className="bg-gray-50 h-7 text-center text-gray-900 text-sm block w-full py-2.5" 
                                                            placeholder="0" value={cartItem[0].quantity} readOnly/>
                                                        <button type="button"
                                                            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-2 h-7 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                            onClick={() => (handleIncreaseQuantity(cartItem[1]))}>
                                                            <PlusIcon className="w-5 h-5 text-gray-900 dark:text-white"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col m-auto items-center justify-center gap-y-2">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{cartItem[0].price*cartItem[0].quantity} eur</p>
                                                    <TrashIcon className="w-5 h-5 text-gray-900 dark:text-white hover:cursor-pointer" 
                                                        onClick={() => (handleDeleteItem(cartItem[1]))}/>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                                return items;
                            })()}
                            <li className='flex justify-between'>
                                <p className="text-sm font-semibold leading-6 text-gray-900">Cena spolu</p>
                                <p className="text-sm font-semibold leading-6 text-gray-900">{totalPrice} eur</p>
                            </li>
                        </ul>
                    </div>
                    <Calendar days={days} totalProductionTime={totalProductionTime} handleSelectDate={handleSelectDate}/>
                    <div className={`${selectedDate === undefined ? 'hidden' : ''} w-full max-w-lg p-6 m-auto bg-white rounded-2xl border-2 shadow-lg flex flex-col gap-5`}>
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold leading-6 text-gray-900">Zvolený dátum</p>
                                <p className="text-sm leading-6 text-gray-900">
                                    {selectedDate === undefined ? '' : (() => {
                                        const parts = (selectedDate.day as unknown as string).split('T')[0].split('-');
                                        return `${parts[2]}.${parts[1]}.${parts[0]}`;
                                    })() as string}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="block rounded-md bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Objednať</button>
                        </div>
                        <div className="border-t">
                            <p className="text-sm font-semibold leading-6 text-gray-900 mt-2">Poznámka pre nás</p>
                            <form>
                            <input
                            id="note"
                            name="note"
                            type="text"
                            placeholder="Napríklad adresa na doručenie, ak je iná ako Vaša v profile"
                            value={note}
                            onChange={handleNoteChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500 sm:text-sm sm:leading-6"
                            />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}