import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
  return (
    <div className="flex min-h-[350px] items-center justify-center py-12">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
          NOTHING HERE YET
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/50">
          Browse the library and add a lift to get today moving.
        </p>
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black text-black transition hover:bg-[#d8ff4d]"
      >
        Go to workouts
        <ArrowRight size={17} />
      </Link>
    </div>
  );
};

export default EmptyState;
