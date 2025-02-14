"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const congratsMessages = [
  "Well done, habits complete!",
  "Great job on finishing your habits!",
  "Habit streak maintained, awesome work!",
  "You're on fire! All habits done!",
  "Fantastic effort, keep it up!",
  "Habits crushed! You're unstoppable!",
  "Another day, another win!",
  "You're building a better you!",
  "Consistency is key, and you've got it!",
  "Habits: Check. Success: Inevitable!",
  "You're making it happen!",
  "Smashing goals, one habit at a time!",
  "Your future self thanks you!",
  "Habit master? That's you!",
  "Keep this up, and watch yourself soar!",
];

export default function Statistics({
  progress,
  streak,
  nextResetTime,
  allCompleted,
}) {
  const [remainingTime, setRemainingTime] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState("");

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

  useEffect(() => {
    if (allCompleted) {
      const randomIndex = Math.floor(Math.random() * congratsMessages.length);
      setCongratsMessage(congratsMessages[randomIndex]);
    }
  }, [allCompleted]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mb-8 relative">
      <ProgressBar progress={progress} allCompleted={allCompleted} />
      <div className="flex flex-wrap justify-between items-center mt-2">
        <p className="text-stone-400">
          Current Streak:{" "}
          <span className="text-emerald-400 font-semibold">{streak}</span>
        </p>
        {allCompleted ? (
          <p className="text-emerald-400 text-xs font-semibold sm:text-right">
            {congratsMessage}
          </p>
        ) : (
          remainingTime !== null && (
            <p className="text-stone-400 text-sm sm:text-right">
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
