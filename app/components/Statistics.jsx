import ProgressBar from "./ProgressBar";

export default function Statistics({ progress, streak }) {
  return (
    <div className="mb-8">
      <ProgressBar progress={progress} />
      <p className="text-center mt-2 text-stone-400">
        Current Streak:{" "}
        <span className="text-emerald-400 font-semibold">{streak} days</span>
      </p>
    </div>
  );
}
