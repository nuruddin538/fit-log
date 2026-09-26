import WorkoutDetails from "@/components/WorkoutDetails";
import { getWorkout } from "@/lib/api";
import { notFound } from "next/navigation";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }
  return <WorkoutDetails workout={workout} />;
};
export default WorkoutDetailsPage;
