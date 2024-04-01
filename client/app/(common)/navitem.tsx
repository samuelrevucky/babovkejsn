"use client";

import { usePathname } from 'next/navigation'
import Link from 'next/link';

export default function NavItem ({ href, children }: Readonly<{ href: string; children: React.ReactNode; }>) {
    const pathname = usePathname()
    return (
      <Link href={href} className={`text-m font-semibold leading-6 text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 ${pathname === href ? 'bg-gray-300' : 'hover:bg-gray-300 hover:text-white'}`}>
          {children}
      </Link>
    );
  };