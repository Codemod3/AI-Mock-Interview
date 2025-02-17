"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion"; // For animations (you'll need to install framer-motion if you want it)
import Header from "./dashboard/_components/Header"; // Import the existing header

function HomePage() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'https://tse4.mm.bing.net/th?id=OIP.PpT9206uhRAkQ45dWTVcWAHaEo&pid=Api&P=0&h=180' }}>
      {/* Include your existing header */}
      <Header />

      {/* Welcome Section */}
      <div className="flex flex-col justify-center items-center h-full text-center bg-black bg-opacity-50">
        <motion.h1 
          className="text-white text-5xl md:text-6xl font-bold animate__animated animate__fadeIn animate__delay-1s"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 2 }}>
          Welcome to Code Crusaders!
        </motion.h1>
        <p className="text-white text-xl mt-4 animate__animated animate__fadeIn animate__delay-2s">
          Empowering developers, one line of code at a time.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="py-16 bg-gray-100">
        <h2 className="text-3xl text-center font-semibold text-gray-800 mb-10">Meet the Team</h2>
        <div className="flex justify-center gap-10">
          {/* Team Member 1 */}
          <div className="text-center">
            <Image src="/team-member1.jpg" alt="Team Member 1" width={150} height={150} className="rounded-full mb-4" />
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p>Frontend Developer</p>
          </div>
          {/* Team Member 2 */}
          <div className="text-center">
            <Image src="/team-member2.jpg" alt="Team Member 2" width={150} height={150} className="rounded-full mb-4" />
            <h3 className="text-lg font-semibold">Jane Smith</h3>
            <p>Backend Developer</p>
          </div>
          {/* Team Member 3 */}
          <div className="text-center">
            <Image src="/team-member3.jpg" alt="Team Member 3" width={150} height={150} className="rounded-full mb-4" />
            <h3 className="text-lg font-semibold">Alex Brown</h3>
            <p>UI/UX Designer</p>
          </div>
          {/* Team Member 4 */}
          <div className="text-center">
            <Image src="/team-member4.jpg" alt="Team Member 4" width={150} height={150} className="rounded-full mb-4" />
            <h3 className="text-lg font-semibold">Mary Johnson</h3>
            <p>Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
