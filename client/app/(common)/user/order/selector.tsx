import { Product } from "./page";
import { useState } from "react";
import { cartItem } from "./order";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";


export default function Selector({
        products, 
        handleCartInput
    }: {
        products: Product[],
        handleCartInput: (c: cartItem) => void
    }) {

    const nameToIndex: Record<string, number> = (() => {
        const pairs: Record<string, number> = {};
        for (let i = 0; i < products.length; i++) {
            pairs[products[i].name] = i;
        }
        return pairs;
    })();

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
        const pairs: Record<string, string> = {};
        for (let variantKey of Object.keys(products[selectedProduct].variants)) {
            pairs[variantKey] = Object.keys(products[selectedProduct].variants[variantKey])[0];
        }
        return pairs;
        });

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedProduct = nameToIndex[e.target.value];
        setSelectedProduct(newSelectedProduct);
        setSelectedVariants(() => {
            const pairs: Record<string, string> = {};
            for (let variantKey of Object.keys(products[newSelectedProduct].variants)) {
                pairs[variantKey] = Object.keys(products[newSelectedProduct].variants[variantKey])[0];
            }
            return pairs;
        });
    };
    
    const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSelectedVariants({ ...selectedVariants, [name]: value });
    };

    let price: number = Object.entries(selectedVariants).reduce(
        (acc, [variantType, selectedVariant]) => {
            return acc + products[selectedProduct].variants[variantType][selectedVariant]['cena'];
        }, products[selectedProduct].base_price);

    let production_time : number = Object.entries(selectedVariants).reduce(
        (acc, [variantType, selectedVariant]) => {
            return acc + products[selectedProduct].variants[variantType][selectedVariant]['cas'];
        }, products[selectedProduct].preparation_time);

    const handleInput = () => {
        handleCartInput({
            name: products[selectedProduct].name,
            variants: selectedVariants,
            price: price,
            production_time: production_time,
            quantity: selectedQuantity
        });
    };

    return (
        <div className='w-full lg:w-1/2 mb-4 lg:mb-auto max-w-lg p-4 m-auto bg-white rounded-2xl shadow-lg border-2 flex flex-col'>  
            <form className="lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                    <p className="text-base leading-7 text-gray-600">
                        Vyberte si koláč a varianty.
                    </p>
                    <div className="mt-2 flex items-center gap-x-4">
                        <div className="h-px flex-auto bg-gray-200" />
                    </div>
                    <div className="mt-8" key="kolac">
                        <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                        Koláč
                        </label>
                        <div className="mt-2">
                        <select
                            id="product"
                            name="product"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleProductChange}
                        >   
                            {products.map((product) => (
                                <option key={product.name}>{product.name}</option>
                            ))}
                        </select>
                        </div>
                        </div>
                    <div className="mt-2 flex items-center gap-x-4">
                        <div className="h-px flex-auto bg-gray-200" />
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600">
                    {Object.keys(products[selectedProduct].variants).map((variant) => (
                        <div key={variant}>
                        <label htmlFor={variant} className="block text-sm font-medium leading-6 text-gray-900">
                        {variant}
                        </label>
                        <div className="mt-2">
                        <select
                            id={variant}
                            name={variant}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleVariantChange}
                        >   
                            {Object.keys(products[selectedProduct].variants[variant]).map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="p-2 lg:mt-0 lg:max-w-md lg:flex-shrink-0">
                    <div className="h-full flex rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex-col lg:justify-center">
                    <div className="mx-auto max-w-xs px-8">
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-4xl font-bold tracking-tight text-gray-900">
                            {price}
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">EUR</span>
                        </p>
                        <button
                        type="button"
                        className="mt-10 block w-full rounded-md bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleInput}
                        >
                        Pridať
                        </button>
                        <div className="max-w-xs mx-auto mt-10">
                            <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Množstvo:</label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" 
                                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    onClick={() => {if (selectedQuantity > 1) setSelectedQuantity(selectedQuantity-1)}}>
                                    <MinusIcon className="w-5 h-5 text-gray-900 dark:text-white"/>
                                </button>
                                <input type="text" id="quantity-input" 
                                    className="bg-gray-50 h-11 text-center text-gray-900 text-sm block w-full py-2.5" 
                                    placeholder="0" value={selectedQuantity} readOnly/>
                                <button type="button" id="increment-button" 
                                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    onClick={() => {if (selectedQuantity < 10) setSelectedQuantity(selectedQuantity+1)}}>
                                    <PlusIcon className="w-5 h-5 text-gray-900 dark:text-white"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div> 
            </form>
        </div>
    );
};