import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({weight: "400", preload: false});

export default async function About() {
    
    return (
        <div className="relative flex-col items-center justify-center white">
            <div className="flex flex-col items-top justify-center p-5">
                <div className="border-t-2 w-full"></div>
                <p className={`${bebas.className} text-black font-thin text-center text-4xl p-5`}>
                Pár slov o tom, čo robíme</p>
                <div className="border-t-2 w-full"></div>
            </div>
            <p className={`m-0 max-w-[100ch] text-center text-sm text-lg opacity-80`}>
                Tu pride odstavec beletrie, na ktoru ale zatial nie je cas. pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
            </p>
        </div>
    );
}