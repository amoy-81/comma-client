import Link from "next/link";
import GoogleLoginBotton from "../_components/GoogleLoginBotton";
import LoginForm from "../_components/loginForm";

export default function LoginPage() {
  return (
    <section className="">
      <h1 className="text-3xl font-semibold mb-6 text-gray-300 text-center">
        Sign In
      </h1>
      <h1 className="text-sm font-semibold mb-6 text-gray-300 text-center">
        Log in to your comma account
      </h1>
      <form action="#" method="POST" className="space-y-4">
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            placeholder="type to here..."
            className="peer h-full w-full border-b border-emerald-500 bg-transparent pt-4 pb-1.5 text-sm font-normal text-gray-200 outline outline-0 transition-all placeholder-shown:border-white focus:border-emerald-600 focus:outline-0 disabled:border-0 disabled:bg-emerald-500 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-600"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-neutral-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-900 peer-focus:after:scale-x-100 peer-focus:after:border-neutral-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-neutral-500">
            Email
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            placeholder="type to here..."
            className="peer h-full w-full border-b border-emerald-500 bg-transparent pt-4 pb-1.5 text-sm font-normal text-gray-200 outline outline-0 transition-all placeholder-shown:border-white focus:border-emerald-600 focus:outline-0 disabled:border-0 disabled:bg-emerald-500 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-600"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-neutral-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-900 peer-focus:after:scale-x-100 peer-focus:after:border-neutral-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-neutral-500">
            Password
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-md hover:bg-neutral-800 focus:bg-emerald-700 focus:outline-none transition-colors duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </form>
      <GoogleLoginBotton />
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>
          If you do not have an account?{" "}
          <Link href="/auth/register" className=" hover:underline">
            register
          </Link>
        </p>
      </div>
    </section>
  );
}
