"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; // For animations
import Header from "./dashboard/_components/Header"; // Import the existing header
import Link from "next/link";

function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }} // Proper url() syntax for background image
    >
      {/* Include Header */}
      <Header />

      {/* Main Content Section */}
      <div className="flex flex-col justify-center items-start h-[80vh] px-10 md:px-20 text-left bg-black bg-opacity-50">
        <motion.h1
          className="text-white text-6xl md:text-7xl font-extrabold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-red-500">Code Crusaders</span>
        </motion.h1>
        <motion.p
          className="text-gray-200 text-xl md:text-2xl mt-4 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
           We are your personal interview website dedicated to helping you practice, prepare, and excel in interviews.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="mt-6"
        >
          <Link href="/dashboard">
            <button className="px-6 py-3 text-lg font-semibold bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all">
              Start Interview
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Footer - Team Members (smaller footer) */}
      <div className="py-8 bg-gray-900 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-gray-400 mb-6">
          The minds behind Code Crusaders.
        </p>

        <div className="flex flex-wrap justify-evenly gap-6 px-6">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/wolf.jpg"
              alt="John Doe"
              width={70}
              height={70}
              className="rounded-full"
            />
            <h3 className="text-lg font-semibold">Frank P Louis</h3>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/lion.jpg"
              alt="Jane Smith"
              width={70}
              height={70}
              className="rounded-full "
            />
            <h3 className="text-lg font-semibold">Allan B Prince</h3>

          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/owl.jpg"
              alt="Alex Brown"
              width={70}
              height={70}
              className="rounded-full "
            />
            <h3 className="text-lg font-semibold">Ananya Mittal</h3>
          </div>

          {/* Team Member 4 */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/ox.jpg"
              alt="Mary Johnson"
              width={70}
              height={70}
              className="rounded-full"
            />
            <h3 className="text-lg font-semibold">Pari</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
