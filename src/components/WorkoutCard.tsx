import { IWorkout } from "@/types/workout";
import { Clock3, Flame, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121514] transition-all duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#181c1a]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
      </div>
      {/* Muscle Group Tags */}
      <div className="py-4 pl-6">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscleGroup) => (
            <span
              key={muscleGroup}
              className="rounded-full bg-[#ccff00] px-6 py-2 text-[10px] font-black uppercase tracking-wide text-black"
            >
              {muscleGroup}
            </span>
          ))}
        </div>
        {/* Workout Name */}
        <h3 className="py-4 text-lg font-black uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#ccff00]">
          {workout.name}
        </h3>
        {/* Equipment */}
        <div className="mb-2 flex items-center gap-2 text-xl font-medium text-white/50">
          <span>{workout.equipment}</span>
        </div>
        {/* Stats Row (Bottom) */}
        <div className="mt-auto flex items-center gap-6 border-t border-white/10 pt-4 mt-6">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-lg font-medium text-white/60">
            <Clock3 size={16} className="text-[#ccff00]" />
            <span>{workout.duration} min</span>
          </div>
          {/* Calories */}
          <div className="flex items-center gap-1.5 text-lg font-medium text-white/60">
            <Flame size={16} className="text-[#ccff00]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-lg font-medium text-white/60">
            <Star size={16} className="text-[#ccff00]" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
