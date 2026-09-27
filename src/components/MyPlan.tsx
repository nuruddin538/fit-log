"use client";

import { useFitLog } from "@/context/FitLogContext";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import EmptyState from "./EmptyState";
import PlanCard from "./PlanCard";
import { ChevronDown, Search } from "lucide-react";

type ActiveTab = "plan" | "saved";
type sortBy = "duration" | "calories" | "rating";

const MyPlan = () => {
  const { plan, setPlan, saved, setSaved, doneIds, setDoneIds } = useFitLog();

  const [activeTab, setActiveTab] = useState<ActiveTab>("plan");
  const [sortBy, setSortBy] = useState<sortBy>("duration");
  const [searchQuery, setSearchQuery] = useState("");

  //   Today's Plan metrics
  const totalExercises = plan.length;
  const totalMinutes = useMemo(() => {
    return plan.reduce((total, workout) => total + workout.duration, 0);
  }, [plan]);

  const totalCalories = useMemo(() => {
    return plan.reduce((total, workout) => total + workout.caloriesBurned, 0);
  }, [plan]);

  //   current lsit based on active tab
  const currentWorkouts = useMemo(() => {
    const workouts = activeTab === "plan" ? [...plan] : [...saved];

    const query = searchQuery.trim().toLowerCase();
    // search by workout name, muscle group, or equipment
    const filteredWorkouts = workouts.filter((workout) => {
      if (!query) return true;
      const searchableText = [
        workout.name,
        workout.equipment,
        ...workout.muscleGroups,
      ]
        .join(" ")
        .toLowerCase();
      return searchableText.includes(query);
    });

    // sort
    return filteredWorkouts.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }
      return b.rating - a.rating;
    });
  }, [activeTab, plan, saved, sortBy, searchQuery]);

  const handleRemove = (id: number) => {
    const workout =
      activeTab === "plan"
        ? plan.find((item) => item.id === id)
        : saved.find((item) => item.id === id);

    if (activeTab === "plan") {
      setPlan((currentPlan) => currentPlan.filter((item) => item.id !== id));

      // remove stale done ID
      setDoneIds((currentIds) => currentIds.filter((doneId) => doneId !== id));
      toast.success(
        workout
          ? `${workout.name} romved from today's plan.`
          : "Workout removed from today's plan"
      );
    } else {
      setSaved((currentSaved) => currentSaved.filter((item) => item.id !== id));
      toast.success(
        workout
          ? `${workout.name} removed from saved`
          : "Workout removed from saved"
      );
    }
  };
  const handleMarkDone = (id: number) => {
    const workout = plan.find((item) => item.id === id);
    if (doneIds.includes(id)) {
      toast.info(
        workout
          ? `${workout.name} is already marks as done`
          : "Workout is already marked as done."
      );
      return;
    }
    setDoneIds((currentIds) => [...currentIds, id]);
    toast.success(
      workout ? `${workout.name} marked as done` : "Workout marked as done"
    );

    const handleClearSearch = () => {
      setSearchQuery("");
    };
  };
  return (
    <main className="min-h-screen bg-[#0b0d0c] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Page Header */}
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black uppercase tracking-wider sm:text-2xl lg:text-5xl">
            MY PLAN
          </h1>
          <p className="mt-4 text-lg leading-6 text-white/55 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        {/* METRICS */}
        <div className="grid grid-cols-1 mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#181b20] sm:grid-cols-3">
          {/* Exercises */}
          <div className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
            <p className="text-sm font-medium text-white/60">Exercises</p>
            <p className="mt-1 text-3xl font-black text-[#ccff00] sm:text-4xl">
              {totalExercises}
            </p>
          </div>
          {/* Minutes */}
          <div className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
            <p className="text-sm font-medium text-white/60">Minutes</p>
            <p className="mt-1 text-3xl font-black sm:text-4xl">
              {totalMinutes}
            </p>
          </div>
          {/* Calories */}
          <div className="p-6">
            <p className="text-sm font-medium text-white/60">Calories</p>
            <p className="mt-1 text-3xl font-black sm:text-4xl">
              {totalCalories}
            </p>
          </div>
        </div>
        {/* Tabs + Sort */}
        <div className="mt-10">
          {/* Tabs */}
          <div className="flex w-fit rounded-2xl bg-[#181b20] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "plan"
                  ? "bg-[#0d0f12] text-[#ccff00]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === "saved"
                  ? "bg-[#0d0f12] text-[#ccff00]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
            {/* search */}
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-white"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="search by workout name, muscle group or equipment..."
                  className="h-12 w-full rounded-xl border border-white/15 bg-[#181b20] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ccff00]"
                />
              </div>
            </div>
            {/* Sort */}
            <div>
              <label
                htmlFor="sort"
                className="mb-2 block text-sm font-medium text-white"
              >
                Sort By
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as sortBy)}
                  className="h-10 w-full rounded-xl border border-white/20 bg-transparent px-3 text-sm text-white outline-none transition focus:border-[#ccff00]"
                >
                  <option value="duration" className="bg-[#181b20]">
                    Duration
                  </option>
                  <option value="calories" className="bg-[#181b20]">
                    Calories
                  </option>
                  <option value="rating" className="bg-[#181b20]">
                    Rating
                  </option>
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                />
              </div>
            </div>
          </div>
          {/* List */}
          <div className="mt-8">
            {currentWorkouts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {currentWorkouts.map((workout) => (
                  <PlanCard
                    key={workout.id}
                    workout={workout}
                    isDone={doneIds.includes(workout.id)}
                    onRemove={handleRemove}
                    onMarkDone={handleMarkDone}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyPlan;
