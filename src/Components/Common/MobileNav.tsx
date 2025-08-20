"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const MobileNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false); // avoid flicker on first paint
  const pathname = usePathname();

  const router = useRouter();

  const navbar = [
    { label: "Home", link: "/" },
    { label: "Task", link: "/tasks" },
  ];

  // 1) Read token on mount and on route change (helps after redirects)
  useEffect(() => {
    try {
      const t =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setToken(t);
    } catch {
      setToken(null);
    } finally {
      setIsReady(true);
    }
  }, [pathname]); // re-check on route change

  // 2) Listen for cross-tab updates (fires only in *other* tabs)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") {
        setToken(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 3) Patch Storage methods so updates in the *same tab* are detected instantly
  useEffect(() => {
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;
    const originalClear = Storage.prototype.clear;

    Storage.prototype.setItem = function (key: string, value: string) {
      originalSetItem.apply(this, [key, value]);
      if (key === "token") setToken(value || null);
    };

    Storage.prototype.removeItem = function (key: string) {
      originalRemoveItem.apply(this, [key]);
      if (key === "token") setToken(null);
    };

    Storage.prototype.clear = function () {
      originalClear.apply(this);
      setToken(null);
    };

    return () => {
      Storage.prototype.setItem = originalSetItem;
      Storage.prototype.removeItem = originalRemoveItem;
      Storage.prototype.clear = originalClear;
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
    setToken(null);
    router.push("/login");
  };
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
        <Link
          onClick={() => setIsSidebarOpen(false)}
          href="/"
          className="absolute left-1/2 top-7 flex items-center"
        >
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

          <div>
            {token ? (
              <div className="mt-5 flex justify-center items-center gap-4 z-10">
                <button
                  className="bg-teal-700 text-white px-4 py-2 rounded-lg text-xl my-auto"
                  onClick={() => {
                    handleLogout();
                    setIsSidebarOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="pr-2 text-black text-[25px] rounded-lg focus:outline-none"
      >
        {!isSidebarOpen && (
          <RxHamburgerMenu className="text-4xl text-teal-700" />
        )}
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
