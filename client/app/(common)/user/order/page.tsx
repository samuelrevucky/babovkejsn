import axios from "axios";
import Order from "./order";


export interface Product {
  id: number,
  name: string,
  base_price: number,
  preparation_time: number,
  variants: {
    [key: string]: {
      [key: string]: {
        cas: number,
        cena: number
      }
    }
  }
}

export interface Day {
  day: Date,
  total_wrkld: number,
  available_wrkld: number,
  holiday: boolean,
  note: string
}

export async function getProducts() {
  const response = await axios.get(process.env.SERVER + '/api/products', {withCredentials: true});
  return response.data;
};

export async function getDays(month: number) {
  const response = await axios.get(process.env.SERVER + '/api/days/' + month, {withCredentials: true});
  return response.data;
}

export default async function Page() {
  try {
    const products: Product[] = await getProducts();
    const days: Day[][] = [];
    const month = new Date().getMonth();
    //add empty lists so that the months align with indices
    for (let i = 0; i < month - 1; i++) days.push([]);
    for (let i = month - 1; i < +month + 3; i++ ) days.push(await getDays(i));
    return (
      <Order products={products} days={days} server={process.env.SERVER as string}/>
    );
  }
  catch (err) {
    console.error(err);
    return (
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Hups, niečo sa pokazilo
        </h2>
      </div>
    );
  }
}