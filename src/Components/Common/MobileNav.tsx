"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCross } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const MobileNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navbar = [
    { label: "Home", link: "/" },
    { label: "Task", link: "/tasks" },
  ];

  return (
    <div className="relative ">
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white text-black z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-5 left-5 text-teal-700 text-4xl p-2 rounded"
        >
          <RxCross1 />
        </button>

        {/* Logo */}
        <Link onClick={() => setIsSidebarOpen(false)} href="/" className="absolute left-1/2 top-7 flex items-center">
          <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
        </Link>

        <div className="mt-32 text-center">
          <ul className="py-4 space-y-6 text-xl">
            {navbar.map((nav, i) => (
              <li key={i}>
                <Link
                  href={nav.link}
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-teal-700 text-2xl ml-3 hover:text-customRed"
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-end items-center gap-4 z-10">
            <div className="flex mx-3 gap-3">
              <Link
                href={"/signup"}
                onClick={() => setIsSidebarOpen(false)}
                className=" text-teal-700  font-semibold hover:text-teal-800 text-2xl my-auto"
              >
                Get Started
              </Link>
              <Link
                href={"/login"}
                onClick={() => setIsSidebarOpen(false)}
                className="bg-teal-700 font-serif text-white px-4 py-2 rounded-lg text-xl my-auto"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="pr-2 text-black text-[25px] rounded-lg focus:outline-none"
      >
        {!isSidebarOpen && <RxHamburgerMenu className="text-4xl text-teal-700" />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default MobileNav;
