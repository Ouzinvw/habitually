import ProgressBar from "./ProgressBar";

export default function Statistics({ progress }) {
  const isComplete = progress === 100;

  return (
    <div className="mb-8 relative">
      <ProgressBar progress={progress} />
      {isComplete && (
        <div className="absolute top-full left-0 right-0 text-center mt-2 text-emerald-400 font-bold animate-bounce">
          Congratulations, you've completed the day!
        </div>
      )}
    </div>
  );
}
