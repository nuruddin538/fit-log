import Image from "next/image";
import Link from "next/link";
import FooterLogo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#171b19]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog Home"
        >
          <span className="flex h-9 w-9 items-center justify-center">
            <Image src={FooterLogo} alt="FooterLogo" width={50} height={50} />
          </span>
          <span className="text-xl font-black tracking-tight text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>
        {/* Copyright */}
        <p className="text-center text-xs text-white/45 sm:text-sm">
          &copy; 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
