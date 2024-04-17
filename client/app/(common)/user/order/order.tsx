"use client";

import { Month, leftArrow, activeLeftArrow, rightArrow, activeRightArrow } from "./calendar";
import Selector from "./selector";
import { useState } from "react";
import { Product, Day } from "./page";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/20/solid";


const dayNames: string[] = ['po', 'ut', 'st', 'št', 'pi', 'so', 'ne'];

interface DateInfo {
    date: number,
    isInMonth: boolean,
    canOrderOnThisDay: boolean
}

function createCalendar(year: number, month: number, days: Day[][], totalProductionTime: number) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfPreviousMonth = new Date(year, month, 0);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const alignedDates: DateInfo[] = [];

    for (let i = lastDayOfPreviousMonth.getDate() - firstDayOfWeek + 2; i <= lastDayOfPreviousMonth.getDate(); i++) {
        alignedDates.push({ date: i, isInMonth: false, canOrderOnThisDay: false });
    }

    const currentDate = new Date();
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        if (month === currentDate.getMonth()) {
            alignedDates.push({date: i, isInMonth: i >= currentDate.getDate(), canOrderOnThisDay: false})
        }
        else {
            alignedDates.push({ date: i, isInMonth: true, canOrderOnThisDay: false });
        }
    }

    const totalDays = alignedDates.length;
    const remainingDays = 7 - (totalDays % 7 === 0 ? 7 : totalDays % 7);
    for (let i = 1; i <= remainingDays; i++) {
        alignedDates.push({ date: i, isInMonth: false, canOrderOnThisDay: false });
    }

    return (
        <div>
            {[...Array(alignedDates.length / 7)].map((_, weekIndex) => (
                <div key={weekIndex} className="flex justify-between font-medium text-sm pb-2">
                    {[...Array(7)].map((_, dayIndex) => {
                        const index = weekIndex * 7 + dayIndex;
                        const dateInfo = alignedDates[index];
                        return (
                            <span key={dayIndex} className={dateInfo.isInMonth ? 
                                'px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer' 
                                : 
                                'px-1 text-gray-400 w-14 flex justify-center items-center'}>
                                {dateInfo.date}
                            </span>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

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

    // calendar logic

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
    const [isRightArrowActive, setIsRightArrowActive] = useState(true);
    
    const handleLeftArrowClick = () => {
        setSelectedMonth(selectedMonth - 1);
        if (selectedMonth - 1 === new Date().getMonth()) {
            setIsLeftArrowActive(false);
        }
        setIsRightArrowActive(true);
    };

    const handleRightArrowClick = () => {
        setSelectedMonth(selectedMonth + 1);
        if (selectedMonth + 2 === days.length) {
            setIsRightArrowActive(false);
        }
        setIsLeftArrowActive(true);
    };

    // cartItem logic
    
    const [cart, setCart] = useState(Array<[cartItem, number]>);
    
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
    }
    const handleIncreaseQuantity = (id: number) => {
        const i = cart.findIndex(item => item[1] === id);
        if (cart[i][0].quantity < 10) {
            cart[i][0].quantity++;
            setCart([...cart]);
        }
    }

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
                <div className="flex flex-col mx-auto w-full lg:w-1/2">
                    <div className={`${cart.length == 0 ? 'hidden' : ''} w-full max-w-lg p-6 m-auto mb-4 bg-white rounded-2xl border-2 shadow-lg flex flex-col`}>
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

                    <div className='w-full max-w-lg p-6 m-auto bg-white rounded-2xl border-2 shadow-lg flex flex-col'>
                        <div className="flex justify-between pb-4">
                            {isLeftArrowActive ? activeLeftArrow(handleLeftArrowClick) : leftArrow()}
                            <span className="uppercase text-sm font-semibold text-gray-600">{Month[selectedMonth % 12]}</span>
                            {isRightArrowActive ? activeRightArrow(handleRightArrowClick) : rightArrow()}
                        </div>
                        <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                            {dayNames.map((day, index) => (
                                <div key={index} className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-black text-black-500 shadow-md">
                                    {day}
                                </div>
                            ))}
                        </div>
                        {createCalendar(new Date().getFullYear(), selectedMonth, days, totalProductionTime)}   
                    </div>
                </div>
            </div>
        </main>
    );
}