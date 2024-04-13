"use client";

import axios from "axios";
import { useState } from "react";
import { server_address } from "@/config";
import { useRouter } from "next/navigation";


export default function Login() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await axios.post(server_address + '/api/authenticate', {
        mail: formData.email,
        password: formData.password
    }, { 
        withCredentials: true,
    })
    .then(function (response) {
        if (response.data.authenticated) {
          router.push("/user_zone");
        }
        else {
          setFormData({email: '', password: ''});
        }
    })
    .catch(function (error) {
        console.error(error);
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Prihláste sa do svojho účtu
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Heslo
                </label>
                <div className="text-sm">
                  <a href="/forgot_password" className="font-semibold text-yellow-500 hover:text-yellow-400">
                    Zabudli ste heslo?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Prihlásiť
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Nemáte účet?{' '}
            <a href="/register" className="font-semibold leading-6 text-yellow-500 hover:text-yellow-400">
              Zaregistrujte sa
            </a>
          </p>
        </div>
      </div>
    </>
  )
}