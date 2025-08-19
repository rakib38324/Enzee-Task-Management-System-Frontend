"use client";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
import MobileNav from "./MobileNav";
import Image from "next/image";

// export default function Navbar() {
//   return (
//     <nav className="bg-white border-b border-gray-200 shadow-sm">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-xl font-semibold text-blue-600"
//         >
//           <FaTasks className="text-2xl" />
//           TaskManager
//         </Link>
//         <div className="space-x-6 text-gray-700 font-medium">
//           <Link href="/" className="hover:text-blue-600 transition">
//             Home
//           </Link>
//           <Link href="/tasks" className="hover:text-blue-600 transition">
//             Tasks
//           </Link>
//           <Link href="/login" className="hover:text-blue-600 transition">
//             Login
//           </Link>
//           <Link href="/signup" className="hover:text-blue-600 transition">
//             Signup
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

const Navbar = () => {
 

  const navbar = [
    { label: "Home", link: "/" },
    { label: "Task", link: "/tasks" },
  ];

  return (
    <header className=" sticky top-0 bg-gray-100 shadow left-0 right-0 z-[500]">
      <div className="max-w-8xl mx-auto py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex justify-between items-center gap-6 mx-10">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
            </Link>

            <div className="hidden lg:flex justify-center  gap-5 z-10">
              {navbar.map((nav, i) => (
                <Link
                  href={nav.link}
                  key={i}
                  className="text-teal-700 text-2xl font-semibold hover:text-teal-800 transition"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Right Section */}

          <div className="hidden lg:flex justify-end items-center gap-4 z-10">
            <div className="flex mx-3 gap-3">
              <Link
                href={"/signup"}
                className="hidden text-teal-700 md:block font-semibold hover:text-teal-800 text-2xl my-auto"
              >
                Get Started
              </Link>
              <Link
                href={"/login"}
                className="bg-teal-700 font-serif text-white px-4 py-2 rounded-lg text-xl my-auto"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Hamburger Button (visible only on mobile) */}
          <div className="block lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
