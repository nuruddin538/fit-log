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
}

// Get data from localStorage
const getStoredData = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
      return defaultValue;
    }
    return JSON.parse(storedData) as T;
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return defaultValue;
  }
};

export const FitLogContext = createContext<IFitLogContext>({
  plan: [],
  setPlan: () => {},

  saved: [],
  setSaved: () => {},

  doneIds: [],
  setDoneIds: () => {},
});

const FitLogProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>(() =>
    getStoredData<IWorkout[]>("fitlog-plan", [])
  );
  const [saved, setSaved] = useState<IWorkout[]>(() =>
    getStoredData<IWorkout[]>("fitlog-saved", [])
  );
  const [doneIds, setDoneIds] = useState<number[]>(() =>
    getStoredData<number[]>("fitlog-done", [])
  );

  // Save plan
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  // Save completed workouts
  useEffect(() => {
    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds]);

  return (
    <FitLogContext.Provider
      value={{ plan, setPlan, saved, setSaved, doneIds, setDoneIds }}
    >
      {children}
    </FitLogContext.Provider>
  );
};
export const useFitLog = () => {
  return useContext(FitLogContext);
};
export default FitLogProvider;
