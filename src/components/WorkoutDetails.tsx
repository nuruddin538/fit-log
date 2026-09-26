"use client";

import { useFitLog } from "@/context/FitLogContext";
import { IWorkout } from "@/types/workout";
import { Bookmark, CalendarPlus } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

interface WorkoutDetailsProps {
  workout: IWorkout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  const { plan, setPlan, saved, setSaved } = useFitLog();

  // Add workout to Today's Plan
  const handleAddToPlan = () => {
    // Prevent duplicate workout
    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      toast.info("Workout is already in today's plan.");
      return;
    }
    // Maximum 5 workouts
    if (plan.length >= 5) {
      toast.warning("Today's plan can contain maximum 5 workouts.");
      return;
    }
    setPlan((currentPlan) => [...currentPlan, workout]);
    toast.success("Added to today's plan");
  };
  // Save Workout
  const handleSaveWorkout = () => {
    // Prevent duplicate saved workout
    const alreadySaved = saved.some((item) => item.id === workout.id);
    if (alreadySaved) {
      toast.info("Workout is already saved");
      return;
    }
    setSaved((currentSave) => [...currentSave, workout]);
    toast.success("Saved for later");
  };
  return (
    <main className="min-h-screen bg-[#0b0d0c] text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#121514] sm:aspect-[16/11] lg:aspect-square">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
          {/* Right side content */}
          <div>
            <div>
              {/* Title */}
              <h1 className="text-2xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                {workout.name}
              </h1>
              {/* Description */}
              <p className="mt-5 text-2xl leading-10 text-white/60 sm:text-lg font-bold">
                {workout.description}
              </p>
              {/* Category Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscleGroup) => (
                  <span
                    key={muscleGroup}
                    className="rounded-full border text-black border-[#ccff00]/30 bg-[#ccff00] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ccff00]"
                  >
                    {muscleGroup}
                  </span>
                ))}
              </div>
            </div>
            {/* key specs */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#121514]">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="divide-y divide-white/10">
                  {/* Equipment */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-semibold uppercase tracking-wider text-white/80">
                      Equipment
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.equipment}
                    </span>
                  </div>
                  {/* Difficulty */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-bold uppercase tracking-wider text-white/80">
                      Difficulty
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.difficulty}
                    </span>
                  </div>
                  {/* Sets */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-bold uppercase tracking-wider text-white/80">
                      Sets
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.sets}
                    </span>
                  </div>
                  {/* Reps */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-bold uppercase tracking-wider text-white/80">
                      Reps
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.reps}
                    </span>
                  </div>
                  {/* Duration */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-bold uppercase tracking-wider text-white/80">
                      Duration
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.duration} min
                    </span>
                  </div>
                  {/* Calories */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-bold uppercase tracking-wider text-white/80">
                      Calories
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.caloriesBurned} kcal
                    </span>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-lg font-bold uppercase tracking-wider text-white/80">
                      Rating
                    </span>
                    <span className="text-right text-lg font-semibold text-white/80">
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* INSTRUCTIONS */}
            <div className="mt-8">
              <div>
                <h2 className="text-sm mb-5 font-black uppercase tracking-[0.2em] text-white">
                  Instructions
                </h2>
              </div>
              <ol className="space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${workout.id}-instruction-${index}`}
                    className="flex gap-2"
                  >
                    {/* Number */}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center text-lg font-semibold text-white">
                      {String(index + 1)}
                    </span>
                    {/* Instruction Text */}
                    <p className="pt-1 text-lg font-semibold text-white">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            {/* CTA BUTTONS */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Add To Plan */}
              <button
                type="button"
                onClick={handleAddToPlan}
                className="flex cursor-pointer min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#d8ff4d] active:scale-[0.98]"
              >
                <CalendarPlus size={18} strokeWidth={3} />
                Add to today&apos; plan
              </button>
              {/* Save For Later */}
              <button
                type="button"
                onClick={handleSaveWorkout}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:border-[#ccff00]/50 hover:text-[#ccff00] active:scale-[0.98]"
              >
                <Bookmark size={18} />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkoutDetails;
