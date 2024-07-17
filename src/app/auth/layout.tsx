import Image from "next/image";
import AuthBanner from "@/assets/svg/auth/AuthBanner.svg";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 text-gray-300 ">
        <div className="max-w-md text-center">
          <h2 className=" text-left mb-4 text-3xl">Comma...</h2>
          <Image src={AuthBanner} alt="Banner" priority={true} />
        </div>
      </div>
      <div className=" relative w-full lg:w-1/2 flex items-center justify-center">
        <div className=" z-0 absolute top-40 left-40 place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-emerald-500 before:opacity-10 after:from-white after:via-emerald-300 after:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        <div className=" max-w-md w-full p-6 z-10">{children}</div>
      </div>
    </div>
  );
}
