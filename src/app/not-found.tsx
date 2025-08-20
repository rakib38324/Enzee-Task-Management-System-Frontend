"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center   ">
      <div>
        <Link href={"/"}>
          {/* Logo */}
          <div>
            <Image
              className="w-full h-full"
              width={1200}
              height={1200}
              unoptimized
              src={"/not found.png"}
              alt="Logo"
            />
          </div>
        </Link>
      </div>

      <div>
        <Link href={"/"}
          className="w-full px-4 py-2 cursor-pointer rounded-lg bg-teal-700 text-white font-medium shadow hover:bg-teal-800 transition"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
