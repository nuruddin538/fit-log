"use client";

import { getWorkouts } from "@/lib/api";
import { IWorkout } from "@/types/workout";
import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);
  return (
    <div
      id="library"
      className="bg-[#0b0d0c] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 lg:mb-14">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-2xl lg:text-3xl">
            THE LIBRARY
          </h2>
          <p className="mt-3 text-sm text-white/60 sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        {/* Loading state */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]"></div>
              <p className="text-sm font-medium text-white/60">
                Loading workouts...
              </p>
            </div>
          </div>
        )}
        {/* Error State */}
        {!loading && error && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-center">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
        {/* No Data */}
        {!loading && !error && workouts.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-white/50">No workouts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLibrary;
