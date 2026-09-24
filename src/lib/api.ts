import { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function getWorkouts() {
  return fetchJSON<Workout[]>(API_URL);
}

export function getWorkouts(id: string) {
  return fetchJSON<Workout>(`${API_URL}/${encodeURIComponent(id)}`);
}
