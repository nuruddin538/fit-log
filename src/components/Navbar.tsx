"use client";

import { useFitLog } from "@/context/FitLogContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { plan, saved } = useFitLog();

  const navLinks = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <nav className="bg-[#0a0a0a] w-full pt-4 pb-2 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Left section: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <Link href="/" className="flex items-center gap-2 group z-50">
            <Image src={logo} width={24} height={24} alt="logo" />
            <span className="font-oswald font-bold text-xl tracking-wide text-white">
              FITLOG
            </span>
          </Link>
        </div>
        {/* Center Section: Desktop Links */}
        <div className="hidden md:flex items-center p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#222222] text-[#ccff00]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        {/* Right Section: Badges (Using Context Data) */}
        <div className="flex items-center gap-2 sm:gap-3 z-50">
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2 bg-[#ccff00] text-black pl-3 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#b3e600] transition-colors"
          >
            Plan
            <span className="bg-[#111111] text-[#ccff00] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-sm">
              {plan.length}
            </span>
          </Link>
          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2 border border-white/30 text-white pl-3 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold hover:border-white/40 transition-colors"
          >
            Saved
            <span className="bg-white/20 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#111111] border-b border-white/10 py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[14px] font-oswald uppercase transition-colors ${
                  isActive ? "text-[#ccff00]" : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
