'use client';

import { Inter } from "next/font/google";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

function NavItem ({ href, children }: Readonly<{ href: string; children: React.ReactNode; }>) {
  const pathname = usePathname()
  return (
    <Link href={href} className={`text-m font-semibold leading-6 text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 ${pathname === href ? 'bg-gray-300' : 'hover:bg-gray-300 hover:text-white'}`}>
        {children}
    </Link>
  );
};

export default function GuestLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
      <>
      <header className="bg-white">
        <nav className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
            <a href="/home" className="-m-4 hidden lg:block">
            <div className="relative flex  items-top justify-center white pb-5">
              <Image
                className="relative pt-3"
                src="/text_logo.png"
                alt="Babovkejsn Logo"
                width={200}
                height={37}
                priority
              />
            </div>
            </a>
            </div>
            <div className="flex gap-x-12">
              <NavItem href="/home">Domov</NavItem>
              <NavItem href="/about">O nás</NavItem>
              <NavItem href="/products">Produkty</NavItem>
              <NavItem href="/order">Objednať</NavItem>
            </div>
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <NavItem href="/login">Prihlásiť sa <span aria-hidden="true">&rarr;</span></NavItem>
            </div>
        </nav>
        </header>
      <>{children}</>
      </>
    );
  }