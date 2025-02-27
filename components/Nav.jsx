"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {getProviders,signIn,signOut,useSession} from "next-auth/react";
import {DropdownMenu,DropdownMenuContent,DropdownMenuSeparator,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { data: session, status } = useSession();
  const pathname=usePathname();
  const [providers, setProviders] = useState(null);

  // console.log(session);
  useEffect(() => {
    async function fetchProvider() {
      const providerList = await getProviders();
      // console.log("Providers List", providerList);
      setProviders(providerList);
    }
    fetchProvider();
  }, []);

  return (
    <div className="flex justify-between items-center w-full mb-16 pt-3">
      {/* Logo+image */}
      <Link href="/" className="flex gap-3 justify-center items-center">
        <Image src="/images/blog.png" alt="Logo" width={50} height={50}></Image>
        <h1 className=" font-semibold text-transparent text-3xl sm:text-2xl xl:text-3xl bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-400 to-yellow-700 bg-transparent h-full">
              Post Pilot
            </h1>
      </Link>

      {/* Sign out Sign  for Desktop*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
          <ModeToggle/>
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            { pathname==='/' &&
              <button
                type="button"
                className="outline_btn"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            }
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                className="rounded-full"
                alt="Profile Image"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className="black_btn"
                  onClick={() => signIn(item.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Sign in and out for mobile nav */}
      <div className="sm:hidden flex gap-3">
      <ModeToggle/>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
               className="rounded-full"
                src={session?.user?.image}
                alt="Logo"
                width={40}
                height={40}
              ></Image>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/create-prompt">Create Post</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full p-0">
                <Button className="w-full" onClick={() => signOut}>
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className="black_btn"
                  onClick={() => signIn(item.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
