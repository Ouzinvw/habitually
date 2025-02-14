"use client";

import { useState, useEffect, useCallback } from "react";
import HabitForm from "./components/HabitForm";
import HabitTable from "./components/HabitTable";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [streak, setStreak] = useState(0);
  const [allCompleted, setAllCompleted] = useState(false);
  const [nextResetTime, setNextResetTime] = useState(null);

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    const storedStreak = localStorage.getItem("streak");
    const storedAllCompleted = localStorage.getItem("allCompleted");
    const storedNextResetTime = localStorage.getItem("nextResetTime");

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
    if (storedStreak) {
      setStreak(Number.parseInt(storedStreak));
    }
    if (storedAllCompleted) {
      setAllCompleted(JSON.parse(storedAllCompleted));
    }
    if (storedNextResetTime) {
      setNextResetTime(Number.parseInt(storedNextResetTime));
    } else {
      setNextDailyReset();
    }
  }, []);

  const setNextDailyReset = useCallback(() => {
    const now = new Date();
    const nextReset = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    );
    setNextResetTime(nextReset.getTime());
    localStorage.setItem("nextResetTime", nextReset.getTime().toString());
  }, []);

  const resetHabits = useCallback(() => {
    const resetHabits = habits.map((habit) => ({ ...habit, completed: false }));
    setHabits(resetHabits);
    setAllCompleted(false);
    localStorage.setItem("habits", JSON.stringify(resetHabits));
    localStorage.setItem("allCompleted", "false");
    setNextDailyReset();
  }, [habits, setNextDailyReset]);

  const checkResetTime = useCallback(() => {
    const now = new Date().getTime();
    if (now >= nextResetTime) {
      if (!allCompleted) {
        setStreak(0);
        localStorage.setItem("streak", "0");
      }
      resetHabits();
    }
  }, [nextResetTime, allCompleted, resetHabits]);

  useEffect(() => {
    const interval = setInterval(checkResetTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkResetTime]);

  const updateStreak = useCallback(() => {
    if (
      habits.every((habit) => habit.completed) &&
      habits.length > 0 &&
      !allCompleted
    ) {
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        localStorage.setItem("streak", newStreak.toString());
        return newStreak;
      });
      setAllCompleted(true);
      localStorage.setItem("allCompleted", "true");
    }
  }, [habits, allCompleted]);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const addHabit = (newHabit) => {
    const updatedHabits = [
      ...habits,
      { ...newHabit, id: Date.now(), completed: false },
    ];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const toggleComplete = (id) => {
    if (allCompleted) return;

    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    // Check if all habits are completed after toggling
    if (updatedHabits.every((habit) => habit.completed)) {
      setAllCompleted(true);
      localStorage.setItem("allCompleted", "true");
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        localStorage.setItem("streak", newStreak.toString());
        return newStreak;
      });
    }
  };

  const removeHabit = (id) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const completedHabits = habits.filter((habit) => habit.completed).length;
  const progress =
    habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;

  return (
    <div className="bg-stone-900 text-stone-200 min-h-screen flex flex-col">
      <div className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Statistics
            progress={progress}
            streak={streak}
            nextResetTime={nextResetTime}
            allCompleted={allCompleted}
          />
          <div className="my-8">
            <Button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200"
            >
              {isFormVisible ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Hide Habit Form
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Add New Habit
                </>
              )}
            </Button>
            {isFormVisible && <HabitForm addHabit={addHabit} />}
          </div>
          <HabitTable
            habits={habits}
            toggleComplete={toggleComplete}
            removeHabit={removeHabit}
            allCompleted={allCompleted}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
