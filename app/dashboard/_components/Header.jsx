"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path)

    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-red-700 shadow-md'>
      <Image src={'/logo.svg'} width={60} height={100} alt='logo'/>
      <ul className='hidden md:flex gap-20 '>
      <li
  className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
    path === "/dashboard" ? "text-primary font-bold" : ""
  }`}
>
  Dashboard
</li>

        <li className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
    path === "/dashboard/questions" ? "text-primary font-bold" : ""
  }`}>Interview</li>
        <li className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
    path === "/dashboard/interview" ? "text-primary font-bold" : ""
  }`}>Upgrade</li>
        <li className={`text-white hover:text-secondary hover:font-bold transition-all cursor-pointer ${
    path === "/dashboard/pat" ? "text-primary font-bold" : ""
  }`}>How it Works</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
