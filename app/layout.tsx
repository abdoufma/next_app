import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavItem from "./components/nav_item";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex gap-2 bg-white p-2 shadow-md">
          <NavItem path="/" text="Home" />
          <NavItem path="/login" text="Login" />
          <NavItem path="/dashboard" text="dashboard" />
          <NavItem path="/test" text="test" />
          <NavItem path={`${backendURL}/login`} text="Login (Express)" className="ml-auto" />
        </nav>
        {children}
      </body>
    </html>
  );
}
