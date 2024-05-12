import { Inter } from "next/font/google";
import Image from "next/image";
import { NavItem, ProductsButton, UserMenu} from './navitem';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const inter = Inter({ subsets: ["latin"] });


function LoginButton() {
  const cookieStore: any = cookies();
  if (!cookieStore.has('authtoken')) {
    return <NavItem href="/login">Prihlásiť sa</NavItem>;
  }
  else {
    const token  = jwt.decode(cookieStore.get('authtoken').value) as { email: string };
    return <UserMenu user={token.email}/>;
  }
}


export default function Layout(
  { children }: 
  Readonly<{ 
    children: React.ReactNode; 
  }>) {
    return (
      <>
        <div className="fixed top-0 left-0 z-10 right-0 bg-white shadow-md">
          <header>
            <nav className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                <a href="/home" className="-m-4 hidden lg:block">
                <div className="relative flex  items-top justify-center white pb-5">
                  <Image
                    className="relative pt-4"
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
                  <ProductsButton/>
                  <NavItem href="/user/order">Objednať</NavItem>
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                  <LoginButton/>
                </div>
            </nav>
          </header>
        </div>
        <div className="p-12">
         &nbsp;
        </div>
        {children}
      </>
    );
  }