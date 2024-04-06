"use client";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

export function NavItem ({ href, children }: Readonly<{ href: string; children: React.ReactNode; }>) {
    const pathname = usePathname()
    return (
      <Link href={href} className={`text-m font-semibold leading-6 text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 ${pathname === href ? 'bg-gray-300' : 'hover:bg-gray-300 hover:text-white'}`}>
          {children}
      </Link>
    );
  };


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export function ProductsButton() {
  const pathname = usePathname()
  const re = new RegExp("\/products\/[a-z]+");
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={` flex items-center text-m font-semibold leading-6 text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 ${re.test(pathname) ? 'bg-gray-300 hover:text-white' : 'hover:bg-gray-300 hover:text-white'}`}>
          Produkty 
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/products/babovka"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Bábovka
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/products/tiramisu"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Tiramisu
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}