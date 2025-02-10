export default function ProgressBar({ progress }) {
  const isComplete = progress === 100;
  return (
    <div className="w-full bg-stone-700 rounded-full h-6 relative">
      <div
        className={`h-6 rounded-full transition-all duration-300 ease-in-out ${
          isComplete ? "bg-emerald-500 animate-pulse" : "bg-emerald-600"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-stone-200">
        Progress: {Math.round(progress)}%
      </div>
    </div>
  );
}
