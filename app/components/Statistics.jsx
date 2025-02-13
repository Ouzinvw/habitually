"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

export default function Statistics({
  progress,
  streak,
  nextResetTime,
  allCompleted,
}) {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const remaining = Math.max(0, Math.ceil((nextResetTime - now) / 1000));
      setRemainingTime(remaining);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [nextResetTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      <ProgressBar progress={progress} />
      <div className="flex flex-wrap justify-between items-center my-2">
        <p className="text-stone-400">
          Current Streak:{" "}
          <span className="text-emerald-400 font-semibold">{streak}</span>
        </p>
        {allCompleted ? (
          <p className="text-emerald-400 font-semibold sm:text-right">
            Congratulations! Check in tomorrow to increase your streak.
          </p>
        ) : (
          remainingTime !== null && (
            <p className="text-stone-400 sm:text-right">
              Time left today:{" "}
              <span className="text-emerald-400 font-semibold">
                {formatTime(remainingTime)}
              </span>
            </p>
          )
        )}
      </div>
    </div>
  );
}
