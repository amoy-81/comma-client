"use client";
import Loader from "@/components/loader/Loader";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import UserIcon from "@/assets/svg/auth/User.svg";
import { axiosAuth } from "@/lib/axios";

export default function RegisterForm() {
  const router = useRouter();

  const [payload, setPayload] = useState<any>({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [confirmPass, setConfirmPass] = useState("");

  const [response, setResponse] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formValidation = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError("Email is not valid");
      return false;
    } else if (payload.password.length < 8) {
      setError(
        "The number of characters in the password field must be at least 8"
      );
      return false;
    } else if (confirmPass !== payload.password) {
      setError("The password and confirmPassword fields do not match");
      return false;
    }

    return true;
  };

  const loginHandler = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    })
      .then((result) => {
        if (result?.ok) {
          setResponse("Login successfully Moving to home page...");
          router.replace("/home");
          console.log("Wellcome back to comma :)");
        } else {
          setError(result?.error || "Login is failed");
        }
      })
      .finally(() => setLoading(false));
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValidation()) return;
    setLoading(true);
    setError(null);

    axiosAuth
      .post("/auth/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async () => {
        setResponse("Register successfully Moving to home page...");
        await loginHandler(payload.email, payload.password);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setError(
            typeof err.response.data.message == "string"
              ? err.response.data.message
              : err.response.data.message[0]
          );
        }
        console.log(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <Loader />}
      <h1
        className={`${
          response
            ? " text-emerald-500"
            : error
            ? " text-rose-600"
            : "text-gray-300"
        } break-words text-sm font-semibold mb-6 text-center`}
      >
        {response
          ? response
          : error
          ? error
          : "Register in comma social network"}
      </h1>
      <form className="space-y-4" onSubmit={formSubmit}>
        <div className=" flex flex-col gap-3 justify-center items-center">
          <label
            htmlFor="avatar"
            className=" bg-gray-600 rounded-full overflow-hidden w-16 h-16 flex justify-center items-center "
          >
            {payload.avatar ? (
              <Image
                src={URL.createObjectURL(payload.avatar)}
                width={100}
                height={100}
                alt="UserIcon"
                className=" w-full h-full"
              />
            ) : (
              <Image src={UserIcon} alt="UserIcon" className=" w-8 h-8" />
            )}
            <input
              id="avatar"
              type="file"
              className=" hidden"
              onChange={(e: any) =>
                setPayload((prev: any) => ({
                  ...prev,
                  avatar: e.target.files[0],
                }))
              }
            />
          </label>
          {payload.avatar && (
            <button
              className=" text-xs text-gray-400"
              onClick={(e: any) => {
                e.preventDefault();
                setPayload((prev: any) => ({
                  ...prev,
                  avatar: null,
                }));
              }}
            >
              remove
            </button>
          )}
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="text"
            value={payload.name}
            name="name"
            onChange={(e) =>
              setPayload((prev: any) => ({ ...prev, name: e.target.value }))
            }
            placeholder="type name to here..."
            className="peer h-full w-full border-b border-emerald-500 bg-transparent pt-4 pb-1.5 text-sm font-normal text-gray-200 outline outline-0 transition-all placeholder-shown:border-white focus:border-emerald-600 focus:outline-0 disabled:border-0 disabled:bg-emerald-500 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-600"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-neutral-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-900 peer-focus:after:scale-x-100 peer-focus:after:border-neutral-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-neutral-500">
            Name
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="text"
            value={payload.email}
            name="email"
            onChange={(e) =>
              setPayload((prev: any) => ({ ...prev, email: e.target.value }))
            }
            placeholder="type email to here..."
            className="peer h-full w-full border-b border-emerald-500 bg-transparent pt-4 pb-1.5 text-sm font-normal text-gray-200 outline outline-0 transition-all placeholder-shown:border-white focus:border-emerald-600 focus:outline-0 disabled:border-0 disabled:bg-emerald-500 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-600"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-neutral-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-900 peer-focus:after:scale-x-100 peer-focus:after:border-neutral-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-neutral-500">
            Email
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            value={payload.password}
            name="password"
            onChange={(e) =>
              setPayload((prev: any) => ({ ...prev, password: e.target.value }))
            }
            placeholder="type password to here..."
            className="peer h-full w-full border-b border-emerald-500 bg-transparent pt-4 pb-1.5 text-sm font-normal text-gray-200 outline outline-0 transition-all placeholder-shown:border-white focus:border-emerald-600 focus:outline-0 disabled:border-0 disabled:bg-emerald-500 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-600"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-neutral-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-900 peer-focus:after:scale-x-100 peer-focus:after:border-neutral-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-neutral-500">
            Password
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            value={confirmPass}
            name="confirmPass"
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="type Confirm Password to here..."
            className="peer h-full w-full border-b border-emerald-500 bg-transparent pt-4 pb-1.5 text-sm font-normal text-gray-200 outline outline-0 transition-all placeholder-shown:border-white focus:border-emerald-600 focus:outline-0 disabled:border-0 disabled:bg-emerald-500 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-600"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-emerald-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-neutral-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-900 peer-focus:after:scale-x-100 peer-focus:after:border-neutral-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-neutral-500">
            Confirm Password
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-emerald-600 hover:bg-emerald-500 focus:bg-emerald-700"
            } w-full text-white p-2 rounded-md hover:bg-neutral-800 focus:outline-none transition-colors duration-300 cursor-pointer`}
          >
            {loading ? "Process..." : "Sign Up"}
          </button>
        </div>
      </form>
    </>
  );
}
