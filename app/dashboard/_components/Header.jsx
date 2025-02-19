"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import icons for the mobile menu

function Header() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <header className="relative bg-gray-900 shadow-md">
      <div className="flex items-center p-4 justify-between relative">
        {/* Left Section: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" width={60} height={100} alt="logo" />
            <h1 className="text-white text-3xl font-bold font-serif">
              CODE CRUSADERS
            </h1>
          </Link>
        </div>

        {/* Center Section: Navigation Links (Desktop Only) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-20">
            <Link href="/dashboard">
              <li
                className={`text-white text-xl hover:text-red-500 hover:font-bold transition-all cursor-pointer ${
                  path === "/dashboard" ? "text-primary font-bold" : ""
                }`}
              >
                START INTERVIEW
              </li>
            </Link>
            <li className="text-white text-xl hover:text-red-500 hover:font-bold transition-all cursor-pointer">
              <a
                href="https://huggingface.co/spaces/TheAllanB/resume_analyser"
                target="_blank"
                rel="noopener noreferrer"
              >
                RESUME ANALYSIS
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Mobile Menu Button & UserButton */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="text-white" size={24} />
              ) : (
                <Menu className="text-white" size={24} />
              )}
            </button>
          </div>
          <UserButton />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4">
          <ul className="flex flex-col items-center gap-4">
            <Link href="/dashboard">
              <li
                className={`text-white text-xl hover:text-red-500 hover:font-bold transition-all cursor-pointer ${
                  path === "/dashboard" ? "text-primary font-bold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Interview
              </li>
            </Link>
            <li
              className="text-white text-xl hover:text-red-500 hover:font-bold transition-all cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a
                href="https://huggingface.co/spaces/TheAllanB/resume_analyser"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume Analysis
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
