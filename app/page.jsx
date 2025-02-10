"use client";

import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitTable from "./components/HabitTable";
import Statistics from "./components/Statistics";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  const addHabit = (newHabit) => {
    const updatedHabits = [
      ...habits,
      { ...newHabit, id: Date.now(), completed: false },
    ];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const toggleComplete = (id) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
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
    <div className="min-h-screen bg-stone-900 text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-stone-100">Progress</h2>
        <Statistics progress={progress} />
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
        />
      </div>
    </div>
  );
}
