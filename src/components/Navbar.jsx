"use client";

import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
  }, [router]);

  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Successfully Logout!");
        router.push("/registration/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav className="flex justify-between items-center sm:p-8 p-2 md:px-16 mb-5">
      <Link href={user ? "/" : "/registration/login"}>
        <h1 className="text-3xl font-extrabold md:leading-[64px] leading-[48px]">
          GIPHY
        </h1>
      </Link>

      {user && (
        <div className="flex items-center sm:gap-x-5 gap-2">
          <Link
            href={`/user/favorite?uid=${user.uid}`}
            className="flex gap-2 border-[1.6px] border-black rounded-xl sm:px-7 sm:py-4 px-4 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Favorite
          </Link>
          <Button action={Logout} text={"Logout"}/>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
