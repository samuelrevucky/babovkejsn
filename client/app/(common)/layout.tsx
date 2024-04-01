import { Inter } from "next/font/google";
import Image from "next/image";
import NavItem from './navitem';

const inter = Inter({ subsets: ["latin"] });


export default function Layout(
  { children }: 
  Readonly<{ 
    children: React.ReactNode; 
  }>) {
    return (
      <>
        <div className="fixed top-0 left-0 z-10 right-0 bg-white shadow-md">
          <header>
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
                  <NavItem href="/products">Produkty</NavItem>
                  <NavItem href="/order">Objednať</NavItem>
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                  <NavItem href="/login">Prihlásiť sa <span aria-hidden="true">&rarr;</span></NavItem>
                </div>
            </nav>
          </header>
        </div>
        <div className="p-10">
         &nbsp;
        </div>
        {children}
      </>
    );
  }