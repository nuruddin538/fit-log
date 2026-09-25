import Image from "next/image";
import banner from "@/assets/banner.png";

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
              <br /> lock it into today`s plan, and watch the week`s work add{" "}
              <br /> up.
            </p>
            <button className="bg-[#ccff00] py-3 px-6 text-[#131212] font-semibold rounded-3xl mt-3">
              Browse Workouts
            </button>
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
