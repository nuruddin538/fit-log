"use client";

import { IWorkout } from "@/types/workout";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IFitLogContext {
  plan: IWorkout[];
  setPlan: React.Dispatch<React.SetStateAction<IWorkout[]>>;

  saved: IWorkout[];
  setSaved: React.Dispatch<React.SetStateAction<IWorkout[]>>;

  doneIds: number[];
  setDoneIds: React.Dispatch<React.SetStateAction<number[]>>;
  hydrated: boolean;
}

const FitLogContext = createContext<IFitLogContext>({
  plan: [],
  setPlan: () => {},

  saved: [],
  setSaved: () => {},

  doneIds: [],
  setDoneIds: () => {},
  hydrated: false,
});

const FitLogProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);

  const [hydrated, setHydrated] = useState(false);

  // load localStorage after client hydration
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedDone = localStorage.getItem("fitlog-done");

    const nextPlan = storedPlan ? (JSON.parse(storedPlan) as IWorkout[]) : [];
    const nextSaved = storedSaved
      ? (JSON.parse(storedSaved) as IWorkout[])
      : [];
    const nextDoneIds = storedDone ? (JSON.parse(storedDone) as number[]) : [];

    setPlan(nextPlan);
    setSaved(nextSaved);
    setDoneIds(nextDoneIds);
    setHydrated(true);
  }, []);

  // save plan
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  // save saved workouts
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  // save completed workouts
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  return (
    <FitLogContext.Provider
      value={{ plan, setPlan, saved, setSaved, doneIds, setDoneIds, hydrated }}
    >
      {children}
    </FitLogContext.Provider>
  );
};
export const useFitLog = () => {
  return useContext(FitLogContext);
};
export default FitLogProvider;
