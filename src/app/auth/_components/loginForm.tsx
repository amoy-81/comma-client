"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "u1@mail.co",
    password: "12345678",
  });
  const [error, setError] = useState<string | null | undefined>(null);

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    }).then((result) => {
      if (result?.ok) {
        // router.replace("/");
        console.log("Good")
      } else {
        setError(result?.error || "Login is failed");
      }
    });
  };

  return (
    <>
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      <form onSubmit={formSubmit}>
        <input
          type="text"
          name="email"
          className=" text-black"
          value={payload.email}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="text"
          className=" text-black"
          value={payload.password}
          name="password"
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button>Submit</button>
      </form>
    </>
  );
}
