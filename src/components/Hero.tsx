import Image from "next/image";
import banner from "@/assets/banner.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div>
      <div className="container mx-auto border rounded-2xl mt-8 border-[#0f1116] bg-[#1a1d24]">
        <div className="md:flex justify-between gap-4 items-center p-6">
          <div className="py-8 pl-8">
            <h3 className="text-2xl sm:text-xl font-medium my-2.5 text-[#ccff00] uppercase">
              Workout Library
            </h3>
            <h1 className="font-bold text-4xl sm:text-2xl my-4 text-white uppercase">
              Train with intent. Log <br /> every set.
            </h1>
            <p className="md:text-xl my-2 text-gray-400 font-light">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              <br /> lock it into today&apos;s plan, and watch the week&apos;s
              work add <br /> up.
            </p>
            {/* CTA */}
            <div className="mt-7">
              <Link
                href="#library"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#131212] transition-all duration-300 hover:bg-[#d9ff4d] hover:shadow-[0_0_25px_rgba(204,255,0,0.25)] sm:px-7 sm:py-4"
              >
                Browse Workouts
                <ArrowRight
                  size={19}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            {/* <button className="bg-[#ccff00] py-3 px-6 text-[#131212] font-semibold rounded-3xl mt-3">
              Browse Workouts
            </button> */}
          </div>
          <div>
            <Image src={banner} width={500} height={500} alt="banner"></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
