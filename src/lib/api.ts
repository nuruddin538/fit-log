import { IWorkout } from "@/types/workout";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data: IWorkout[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch workouts: ", error);
    throw error;
  }
};

export const getWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch workout ${id}:`, error);
    throw error;
  }
};
