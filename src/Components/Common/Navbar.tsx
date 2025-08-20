"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const navbar = [
    { label: "Home", link: "/" },
    { label: "Tasks", link: "/tasks" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false); // avoid flicker on first paint

  // 1) Read token on mount and on route change (helps after redirects)
  useEffect(() => {
    try {
      const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
    <header className="sticky top-0 bg-gray-100 shadow left-0 right-0 z-[500]">
      <div className="max-w-8xl mx-auto py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex justify-between items-center gap-6 mx-10">
            <Link href="/" className="flex items-center">
              <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
            </Link>

            <nav className="hidden lg:flex justify-center gap-5 z-10">
              {navbar.map((nav) => (
                <Link
                  key={nav.link}
                  href={nav.link}
                  className="text-teal-700 text-2xl font-semibold hover:text-teal-800 transition"
                >
                  {nav.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div>
            {!isReady ? null : token ? (
              <div className="mr-2 hidden lg:flex justify-end items-center gap-4 z-10">
                <button
                  className="bg-teal-700 cursor-pointer text-white px-4 py-2 rounded-lg text-xl my-auto"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
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
            )}
          </div>

          {/* Mobile Nav */}
          <div className="block lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
