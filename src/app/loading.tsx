const loading = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
        <div className="mx-auto mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-200 p-5"
          >
            <div className="h-52 rounded-lg bg-gray-200" />
            <div className="mt-5 h-6 w-3/4 rouded bg-gray-200" />
            <div className="mt-3 h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
            <div className="mt-5 h-10 w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default loading;
