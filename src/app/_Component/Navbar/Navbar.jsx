"use client";

import { useState } from "react";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Simple Ecommerce
        </Link>
        {/* larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/newProd" className="hover:text-gray-400">
            New Product
          </Link>
         
        </div>

        <button
          className="md:hidden text-3xl cursor-pointer focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMenuSharp />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 bg-white p-5 rounded text-black space-y-3">
            <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/newProd" className="hover:text-gray-400">
            New Product
          </Link>
       
        </div>
      )}
    </nav>
  );
}
