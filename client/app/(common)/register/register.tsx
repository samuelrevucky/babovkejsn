"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Popup from "./popup";
import validator from 'validator';


export default function Register({ server }: { server: string }) {
  const router = useRouter();
  const [popUp, setPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    country: 'Slovensko',
    street: '',
    city: '',
    postalcode: ''
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    if (!validator.isMobilePhone(formData.phone, 'sk-SK', {strictMode: true})) {
      (document.getElementById('phone') as HTMLInputElement).setCustomValidity('Číslo zadávajte v tvare +421...');
      (document.getElementById('phone') as HTMLInputElement).reportValidity();
      return false;
    }
    if (!validator.isEmail(formData.email)) {
      (document.getElementById('email') as HTMLInputElement).setCustomValidity('Email má nesprávny tvar.');
      (document.getElementById('email') as HTMLInputElement).reportValidity();
      return false;
    }
    if (!validator.matches(formData.password, /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;'"<>,.?\/\\~-]+$/)) {
      (document.getElementById('password') as HTMLInputElement).setCustomValidity('Heslo obsahuje nedovolený znak.');
      (document.getElementById('password') as HTMLInputElement).reportValidity();
      return false;
    }

    if (!validator.isStrongPassword(formData.password)) {
      (document.getElementById('password') as HTMLInputElement).setCustomValidity('Slabé heslo.');
      (document.getElementById('password') as HTMLInputElement).reportValidity();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation() && e.currentTarget.checkValidity()) {
    try {
      await axios.post(server + '/api/register', formData, { withCredentials: true })
        .then(response => {
          if (response.status === 200) {
            router.push('/register/succ');
          }
        })
        .catch(error => {
          console.log(error.response.status);
          if (error.response.status === 400) {
            setPopUpMessage("Údaje, ktoré ste zadali, nemajú správny formát");
            setPopUp(true);
          }
          else if (error.response.status === 409) {
            setPopUpMessage("Email, ktorý ste zadali, už niekto u nás používa");
            setPopUp(true);
          }
          else if (error.response.status === 500) {
            setPopUpMessage("Ospravedlňujeme sa, niekde nastala chyba, skúste to znovu neskôr, alebo nám napíšte email");
            setPopUp(true);            
          }
        })
    }
    catch (error) {
      console.log(error);
    }
    }
  };

  return (
    <div className="mx-auto max-w-2xl mt-30">
      <form onSubmit={handleSubmit}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-4">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrácia
          </h2>
        </div>
        <div className="border-t-2 w-full pb-10 border-yellow-500"></div>
        <div className="space-y-12">

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Osobné informácie</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Meno
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="first-name"
                    autoComplete="given-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.');
                      else if (e.currentTarget.validity.patternMismatch) e.currentTarget.setCustomValidity('Meno môže obsahovať len abecedné znaky.');
                    }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                    pattern="^[a-zA-ZÁáČčĎďÉéÍíŇňÓóŠšŤťÚúÝýŽžĹĺŔŕĽľÄäÔô]+$"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Priezvisko
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastname"
                    id="last-name"
                    autoComplete="family-name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.');
                      else if (e.currentTarget.validity.patternMismatch) e.currentTarget.setCustomValidity('Priezvisko môže obsahovať len abecedné znaky.');
                    }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                    pattern="^[a-zA-ZÁáČčĎďÉéÍíŇňÓóŠšŤťÚúÝýŽžĹĺŔŕĽľÄäÔô]+$"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.')
                      else e.currentTarget.setCustomValidity('Email má nesprávny tvar.')}}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                  Mobil
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="mobile tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+421..."
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.');
                      else if (e.currentTarget.validity.patternMismatch) e.currentTarget.setCustomValidity('Číslo zadávajte v tvare +421...');
                    }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                    pattern="^\+[0-9]+$"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Heslo
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => { if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.') }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Krajina
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Slovensko</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Ulica
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street"
                    id="street-address"
                    autoComplete="street-address"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.');
                      else if (e.currentTarget.validity.patternMismatch) e.currentTarget.setCustomValidity('Ulica môže obsahovať len abecedné znaky, čísla a medzery.');
                    }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                    pattern="^[0-9a-zA-ZÁáČčĎďÉéÍíŇňÓóŠšŤťÚúÝýŽžĹĺŔŕĽľÄäÔô ]+$"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Mesto
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.');
                      else if (e.currentTarget.validity.patternMismatch) e.currentTarget.setCustomValidity('Mesto môže obsahovať len abecedné znaky a medzery.');
                    }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                    pattern="^[a-zA-ZÁáČčĎďÉéÍíŇňÓóŠšŤťÚúÝýŽžĹĺŔŕĽľÄäÔô ]+$"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  PSČ
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalcode"
                    id="postal-code"
                    autoComplete="postal-code"
                    value={formData.postalcode}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                    onInvalid={e => {
                      if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity('Toto pole nesmie byť prázdne.');
                      else if (e.currentTarget.validity.patternMismatch) e.currentTarget.setCustomValidity('Nesprávny tvar PSČ.');
                    }}
                    onInput={e => e.currentTarget.setCustomValidity('')}
                    pattern="^\d{3}\s?\d{2}$"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href='/login'>
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Zrušiť
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registrovať
          </button>
        </div>
      </form>
      {popUp && <Popup message={popUpMessage} onClose={() => setPopUp(false)}/>}
    </div>
  )
}