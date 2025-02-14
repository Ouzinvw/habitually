export default function ProgressBar({ progress, allCompleted }) {
  const displayProgress = allCompleted ? 100 : progress;

  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1 text-sm">
        <span>Progress</span>
        <span>{Math.round(displayProgress)}%</span>
      </div>
      <div className="w-full bg-stone-700 rounded-md h-4">
        <div
          className="bg-emerald-500 h-4 rounded-md transition-all duration-300 ease-in-out"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
