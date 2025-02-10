export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-stone-700 rounded-full h-2.5">
      <div
        className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
