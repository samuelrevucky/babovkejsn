import Link from "next/link";

export default function Page() {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center gap-y-5">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrácia bola úspešná
          </h2>
          <Link href={'/login'}>
            <button 
                type="button"
                className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Prihlásiť sa
            </button>
          </Link>
        </div>
      );
}