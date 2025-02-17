"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // ✅ Import Link

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="flex p-4 items-center justify-between bg-blue-300 shadow-md">
      {/* ✅ Logo and Title Section */}
      <Link href="/" className="flex items-center gap-3">
        <Image src={"/logo.svg"} width={60} height={100} alt="logo" />
        <h1 className="text-white text-3xl font-bold font-serif">CODE CRUSADERS</h1>
      </Link>

      {/* ✅ Navigation Links */}
      <ul className="hidden md:flex gap-20">
        <Link href="/dashboard">
          <li
            className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard" ? "text-primary font-bold" : ""
            }`}
          >
            Dashboard
          </li>
        </Link>

        <Link href="/dashboard/questions">
          <li
            className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/questions" ? "text-primary font-bold" : ""
            }`}
          >
            Interview
          </li>
        </Link>

        <Link href="/dashboard/interview">
          <li
            className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/interview" ? "text-primary font-bold" : ""
            }`}
          >
            Upgrade
          </li>
        </Link>

        <Link href="/dashboard/pat">
          <li
            className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/pat" ? "text-primary font-bold" : ""
            }`}
          >
            How it Works
          </li>
        </Link>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
