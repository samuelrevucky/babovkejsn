import axios from "axios";
import { server_address } from "@/config";
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

async function getProducts() {
  try {
      const response = await axios.get(server_address + '/api/products');
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

async function getDays(month: number) {
  try {
    const response = await axios.get(server_address + '/api/days/' + month);
    return response.data;
  } catch (error) {
      console.error(error);
  }
}

export default async function Page() {
  const products: Product[] = await getProducts();
  const days: Day[][] = [];
  const month = new Date().getMonth();
  //add empty lists so that the months align with indices
  for (let i = 0; i < month; i++) days.push([]);
  for (let i = month; i < +month + 3; i++ ) days.push(await getDays(i));
  return (
    <Order products={products} days={days}/>
  );
}