import { MouseEventHandler } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";


export enum Month {
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

export const leftArrow = () => (
    <div>
        <ArrowLeftIcon className="-mx-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
    </div>
);
export const activeLeftArrow = (handleLeftArrow: MouseEventHandler) => (
    <div className="cursor-pointer" onClick={handleLeftArrow}>
        <ArrowLeftIcon className="-mx-2 h-5 w-5 text-gray-800 hover:text-yellow-400" aria-hidden="true"/>
    </div>
);
export const rightArrow = () => (
    <div>
        <ArrowRightIcon className="-mx-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
    </div>
);
export const activeRightArrow = (handleRightArrow: MouseEventHandler) => (
    <div className="cursor-pointer" onClick={handleRightArrow}>
        <ArrowRightIcon className="-mx-2 h-5 w-5 text-gray-800 hover:text-yellow-400" aria-hidden="true"/>
    </div>
);