import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Day } from "./page";


enum Month {
    Január,
    Február,
    Marec,
    Apríl,
    Máj,
    Jún,
    Júl,
    August,
    September,
    Október,
    November,
    December
}

const dayNames: string[] = ['po', 'ut', 'st', 'št', 'pi', 'so', 'ne'];

interface DateInfo {
    date: number,
    isInMonth: boolean,
}

export default function Calendar(
    { days, totalProductionTime, handleSelectDate }: 
    {days: Day[][], totalProductionTime: number, handleSelectDate: (d: Day | undefined) => void}) {

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(-1);
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

    const handleSelect = (index: number, d: Day | undefined) => {
        if (selectedDate !== index) {
            setSelectedDate(index);
            handleSelectDate(d);
        }
        else {
            setSelectedDate(-1);
            handleSelectDate(undefined);
        }
    }

    const leftArrow = () => (
        <div>
            <ArrowLeftIcon className="-mx-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
        </div>
    );
    const activeLeftArrow = () => (
        <div className="cursor-pointer" onClick={handleLeftArrowClick}>
            <ArrowLeftIcon className="-mx-2 h-5 w-5 text-gray-800 hover:text-yellow-400" aria-hidden="true"/>
        </div>
    );
    const rightArrow = () => (
        <div>
            <ArrowRightIcon className="-mx-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
        </div>
    );
    const activeRightArrow = () => (
        <div className="cursor-pointer" onClick={handleRightArrowClick}>
            <ArrowRightIcon className="-mx-2 h-5 w-5 text-gray-800 hover:text-yellow-400" aria-hidden="true"/>
        </div>
    );

    const currentDate = new Date();
    const daysLengths: number[] = days.map(arr => arr.length);
    const flattenedDays: Day[] = ([] as Day[]).concat(...days);
    const flattenedMask: boolean[] = Array.from({ length: flattenedDays.length }, (_) => false);
    const currentDateIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() + currentDate.getDate();
    let i = currentDate.getHours() > 16 ? currentDateIndex + 1 : currentDateIndex;
    if (flattenedDays[i-1].available_wrkld >= totalProductionTime) {
        flattenedMask[i] = true;
    }
    i++;
    if (flattenedDays[i-1].available_wrkld + flattenedDays[i-2].available_wrkld >= totalProductionTime) {
        flattenedMask[i] = true;
    }
    i++;
    while (i < flattenedMask.length) {
        if (flattenedDays.slice(i-3, i).reduce((acc, day) => (acc + day.available_wrkld), 0) >= totalProductionTime) {
            flattenedMask[i] = true;
        }
        i++;
    }
    const mask: boolean[][] = [];
    let index = 0;
    for (let length of daysLengths) {
        mask.push(flattenedMask.slice(index, index + length));
        index += length;
    }
    

    const createCalendar = () => {
    
        const year = new Date().getFullYear();
        const firstDayOfMonth = new Date(year, selectedMonth, 1);
        const lastDayOfPreviousMonth = new Date(year, selectedMonth, 0);
        const lastDayOfMonth = new Date(year, selectedMonth + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();
    
        const alignedDates: DateInfo[] = [];
    
        for (let i = lastDayOfPreviousMonth.getDate() - firstDayOfWeek + 2; i <= lastDayOfPreviousMonth.getDate(); i++) {
            alignedDates.push({ date: i, isInMonth: false });
        }
    
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            if (selectedMonth === currentDate.getMonth()) {
                alignedDates.push({ date: i, isInMonth: i >= currentDate.getDate() })
            }
            else {
                alignedDates.push({ date: i, isInMonth: true });
            }
        }
    
        const totalDays = alignedDates.length;
        const remainingDays = 7 - (totalDays % 7 === 0 ? 7 : totalDays % 7);
        for (let i = 1; i <= remainingDays; i++) {
            alignedDates.push({ date: i, isInMonth: false });
        }
    
        return (
            <div>
                {[...Array(alignedDates.length / 7)].map((_, weekIndex) => (
                    <div key={weekIndex} className="flex justify-between font-medium text-sm pb-2">
                        {[...Array(7)].map((_, dayIndex) => {
                            const index = weekIndex * 7 + dayIndex;
                            const dateInfo = alignedDates[index];
                            //handle unselect due to increased quantity
                            if (index === selectedDate && !mask[selectedMonth][dateInfo.date - 1]) {
                                handleSelect(-1, undefined);
                            }
                            if (selectedDate !== -1 && totalProductionTime === 0) {
                                handleSelect(-1, undefined);
                            }
                            return (
                                <span 
                                    key={dayIndex} 
                                    className={
                                        dateInfo.isInMonth 
                                            ? mask[selectedMonth][dateInfo.date - 1] 
                                                ? index === selectedDate
                                                    ? 'px-1 w-14 flex justify-center items-center border border-yellow-400 bg-yellow-400 cursor-pointer'
                                                    : 'px-1 w-14 flex justify-center items-center border hover:border-yellow-400 hover:bg-yellow-200 cursor-pointer'
                                                : 'px-1 w-14 flex justify-center items-center border bg-red-300' 
                                            : 'px-1 text-gray-400 w-14 flex justify-center items-center'}
                                    onClick={
                                        dateInfo.isInMonth && mask[selectedMonth][dateInfo.date - 1] && totalProductionTime > 0
                                        ? () => handleSelect(index, days[selectedMonth][dateInfo.date - 1])
                                        : () => {}
                                    }
                                >
                                    {dateInfo.date}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='w-full max-w-lg p-6 m-auto bg-white rounded-2xl border-2 shadow-lg flex flex-col'>
            <div className="flex justify-between pb-4">
                {isLeftArrowActive ? activeLeftArrow() : leftArrow()}
                <span className="uppercase text-sm font-semibold text-gray-600">{Month[selectedMonth % 12]}</span>
                {isRightArrowActive ? activeRightArrow() : rightArrow()}
            </div>
            <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                {dayNames.map((day, index) => (
                    <div key={index} className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-black text-black-500 shadow-md">
                        {day}
                    </div>
                ))}
            </div>
            {createCalendar()}   
        </div>
    );
};