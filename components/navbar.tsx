"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#15171C]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl/[1] font-bold tracking-tight text-zinc-100"
        >
          <span className="text-indigo-400">h</span>irel
          <span className="text-orange-500">oo</span>
          <span className="text-indigo-400">p</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="mr-2 flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-white/[0.07] text-white"
                    : "text-zinc-300 hover:text-white",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Separator
            orientation="vertical"
            className="h-5 self-center bg-white/15"
          />

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              render={<Link href="/login" />}
              className="text-indigo-400 hover:bg-transparent hover:text-indigo-300"
            >
              Sign In
            </Button>

            <Button
              render={<Link href="/register" />}
              className="rounded-xl bg-indigo-500 px-5 py-2.5 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
                />
              }
            >
              <Menu size={20} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-white/10 bg-[#15171C] p-6 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-2xl/[1] font-bold tracking-tight text-zinc-100">
                  <span className="text-indigo-400">h</span>irel
                  <span className="text-orange-500">oo</span>
                  <span className="text-indigo-400">p</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                          isActive(link.href)
                            ? "bg-white/[0.07] text-white"
                            : "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
                        )}
                      />
                    }
                  >
                    {link.name}
                  </SheetClose>
                ))}
              </div>

              <SheetFooter className="border-t border-white/10 pt-5">
                <SheetClose
                  render={
                    <Button
                      variant="outline"
                      className="w-full border-white/10 bg-transparent text-white hover:bg-white/10"
                    />
                  }
                >
                  <Link href="/login">Sign In</Link>
                </SheetClose>

                <SheetClose
                  render={
                    <Button className="mt-3 w-full rounded-xl bg-indigo-500 py-2.5 text-white hover:bg-indigo-400" />
                  }
                >
                  <Link href="/register">Get Started</Link>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
