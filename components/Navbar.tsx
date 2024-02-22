'use client'

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import LogoutButton from "./auth/LogoutButton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar({ token }: { token: string | undefined }) {
  const path = usePathname()

  if (path.startsWith('/dashboard') || path.startsWith('/restaurant')) return null

  return (
    <div className={cn("sticky z-50 top-0 inset-x-0 h-16",)}>
      <header className="relative bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5">
          <div className="flex h-16 items-center border-b border-gray-200">
            <div className="ml-4 flex text-3xl italic text-primary lg:ml-0">
              <Link href='/'>
                Zou
              </Link>
            </div>

            <div className="ml-auto">
              <div className="hidden items-center space-x-4 lg:flex">
                {token ? (
                  <>
                    <Link href='/dashboard/overview'>
                      Dashboard
                    </Link>
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link href='/login'>
                      Login
                    </Link>
                    <Link href='/register'>
                      Register
                    </Link>
                  </>
                )
                }
              </div>

              <div className="cursor-pointer lg:hidden">
                <Sheet>
                  <SheetTrigger><Menu /></SheetTrigger>
                  <SheetContent className="p-0 pt-10">
                    <SheetHeader>
                      <SheetDescription>
                        <div className="text-black lg:hidden">
                          {
                            token ? (
                              <div className="flex flex-col items-center space-y-4">
                                <SheetClose asChild>
                                  <Link className="w-full border-b bg-gray-200 p-2 text-base hover:bg-gray-300" href='/dashboard/overview'>
                                    Dashboard
                                  </Link>
                                </SheetClose>
                                <LogoutButton />
                              </div>
                            ) : (
                              <div className="flex flex-col">
                                <SheetClose asChild>
                                  <Link className="border-b border-gray-400 bg-gray-200 p-2 text-base hover:bg-gray-300" href='/login'>
                                    Login
                                  </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                  <Link className="border-b bg-gray-200 p-2 text-base hover:bg-gray-300" href='/register'>
                                    Register
                                  </Link>
                                </SheetClose>
                              </div>
                            )
                          }
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
