const Loading = ({ text = "Loading workouts..." }: { text?: string }) => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#292929] border-t-[#ccff00]"></div>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
