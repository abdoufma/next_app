"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:80";

// import "@/app/globals.css";
export default function Login() {
  const [formError, setFormError] = useState<string | undefined>();
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // e.submit();
  }
  async function handleLogin(data: FormData) {
    // send a POST request with the fields `email` and `password` as a form/url-encoded payload
    try {
      console.log({ backendURL });
      const res = await fetch(`${backendURL}/login`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });

      console.log(res.headers);

      if (res.status == 200) {
        console.log("Login successful");
        router.push("/dashboard");
      } else {
        console.log("Login failed");
        setFormError(await res.text());
      }

      //   console.log(await res.text());
    } catch (err) {
      console.error(err);
      setFormError(JSON.stringify(err));
    }
    //
  }
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-slate-100 p-10">
      {/* <form className="flex w-full min-w-80 flex-col gap-1 rounded-lg bg-white p-8 shadow sm:w-2/3 lg:w-1/4" action={`${backendURL}/login?redirect=${frontendURL}/dashboard`} method="post"> */}
      <form className="flex w-full min-w-80 flex-col gap-1 rounded-lg bg-white p-8 shadow sm:w-2/3 lg:w-1/4" action={handleLogin}>
        <h1 className="self-center text-xl font-medium">Login</h1>

        <label htmlFor="email">Email</label>
        <input className="rounded-md border border-blue-100 bg-slate-50 px-2 py-1" type="text" name="email" autoFocus required placeholder="john.doe@example.com" />

        <label className="mt-2" htmlFor="password">
          Password
        </label>
        <input className="rounded-md border border-blue-100 bg-slate-50 px-2 py-1" type="password" name="password" />

        <button className="m-4 w-1/2 cursor-pointer self-center rounded-md bg-blue-700 px-4 py-2 text-center font-medium text-white hover:bg-blue-800" type="submit">
          Login
        </button>
        <p className="form-error text-center text-xs text-red-600">{formError}</p>
        <p className="text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link href="#" className="text-blue-700">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}
