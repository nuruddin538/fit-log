import { IWorkout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<IWorkout[]> => {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return response.json();
};

export const getWorkout = async (id: string): Promise<IWorkout | null> => {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-cache",
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }
  return response.json();
};
