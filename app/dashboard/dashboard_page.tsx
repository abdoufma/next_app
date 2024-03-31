"use client";

import { useState } from "react";

export default function DashboardPage() {
  // return <h2>Welcome to your Dashboard!</h2>;
  const [data, setData] = useState("");
  const [error, setError] = useState<string>("");
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  const sendRequest = async () => {
    try {
      const res = await fetch(`${backendURL}/api/protected`, { credentials: "include" });
      if (res.status !== 200) setError(`Error : (HTTP code ${res.status})`);
      const data = await res.text();
      setData(data);
    } catch (err) {
      setError(`Unexpected Error : ${err}`);
    }
  };
  return (
    <main className="p4 m-auto flex h-screen w-screen cursor-pointer flex-col items-center justify-center gap-2 border">
      <h2>Welcome to your Dashboard!</h2>
      <div className="flex gap-5">
        <button className="btn rounded-lg bg-blue-500 px-4 py-2 font-medium text-white" onClick={sendRequest}>
          API Request 1
        </button>
        <button className="btn">Request 2</button>
      </div>
      <p className="error text-red-500">{error}</p>
      <b className="rounded-lg border border-dashed border-blue-900 bg-blue-400 p-6 text-center">
        <p>Server response:</p>
        <p>{data}</p>
      </b>
    </main>
  );
}
