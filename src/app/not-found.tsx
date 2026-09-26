import { Dumbbell, Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <Dumbbell className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-7xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Workout Not Found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Sorry, the page you are looking for does not exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
