"use client";

import Link from "next/link";
// import { Dumbbell, Menu, X } from "lucide-react";

import { useState } from "react";
import { usePathname } from "next/navigation";

// import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();

  //   const { plan, saved } = useFitLog();

  const [open, setOpen] = useState(false);

  const workoutActive = pathname === "/";

  const planActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-xl">
      <div className="container-fit flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime text-black">
            {/* <Dumbbell size={17} strokeWidth={3} /> */}
          </span>

          <span className="font-display text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
              workoutActive
                ? "bg-card text-lime"
                : "text-muted hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
              planActive ? "bg-card text-lime" : "text-muted hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="hidden items-center gap-5 sm:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[10px] font-bold text-gray-300"
          >
            Plan
            {/* <span className="counter-filled">{plan.length}</span> */}
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[10px] font-bold text-gray-300"
          >
            Saved
            {/* <span className="counter-outline">{saved.length}</span> */}
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-gray-300 hover:bg-card md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {/* {open ? <X size={20} /> : <Menu size={20} />} */}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-bg px-4 py-4 md:hidden">
          <nav className="container-fit flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-bold ${
                workoutActive ? "bg-card text-lime" : "text-gray-300"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-bold ${
                planActive ? "bg-card text-lime" : "text-gray-300"
              }`}
            >
              My Plan
            </Link>

            <div className="mt-2 flex gap-4 border-t border-line pt-4">
              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs text-gray-300"
              >
                Plan
                {/* <span className="counter-filled">{plan.length}</span> */}
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-xs text-gray-300"
              >
                Saved
                {/* <span className="counter-outline">{saved.length}</span> */}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
