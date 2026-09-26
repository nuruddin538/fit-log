import { IWorkout } from "@/types/workout";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PlanCardProps {
  workout: IWorkout;
  isDone: boolean;
  onRemove: (id: number) => void;
  onMarkDone: (id: number) => void;
}

const PlanCard = ({ workout, isDone, onRemove, onMarkDone }: PlanCardProps) => {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-[#181b20] transition ${
        isDone ? "border-[#ccff00]/30 opacity-60" : "border-white/10"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-40 md:w-44">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 176px"
          />
        </div>
        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`text-lg font-black uppercase tracking-tight ${
                    isDone ? "text-white/50 line-through" : "text-white"
                  }`}
                >
                  {workout.name}
                </h3>
                <p className="mt-1 text-sm text-white/55">
                  {workout.equipment}
                </p>
              </div>
              {/* Remove */}
              <button
                type="button"
                onClick={() => onRemove(workout.id)}
                aria-label={`Remove ${workout.name}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
            {/* States */}
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <Clock3 size={16} className="text-[#ccff00]" />
                <span>{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <Flame size={16} className="text-[#ccff00]" />
                <span>{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/80">
                <Star size={16} className="text-[#ccff00]" />
                <span>{workout.rating}</span>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link
              href={`/workout/${workout.id}`}
              className="inline-flex items-center justify-center rounded-full border border-white/80 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              View Details
            </Link>
            <button
              type="button"
              disabled={isDone}
              onClick={() => onMarkDone(workout.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                isDone
                  ? "cursor-not-allowed bg-[#ccff00]/20 text-[#ccff00]"
                  : "bg-[#ccff00] text-black hover:bg-[#d8ff4d]"
              }`}
            >
              <Check size={15} strokeWidth={3} />
              {isDone ? "Done" : "Mark as Done"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PlanCard;
