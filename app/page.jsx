"use client";

import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitTable from "./components/HabitTable";
import Statistics from "./components/Statistics";

// Mock data
const initialHabits = [
  {
    id: 1,
    name: "Exercise",
    description: "Go for a 30-minute run",
    priority: "high",
    goal: "5 times a week",
    dateAdded: "2023-05-01",
    completed: false,
  },
  {
    id: 2,
    name: "Read",
    description: "Read a book for 20 minutes",
    priority: "medium",
    goal: "Daily",
    dateAdded: "2023-05-02",
    completed: true,
  },
  {
    id: 3,
    name: "Meditate",
    description: "Practice mindfulness",
    priority: "low",
    goal: "3 times a week",
    dateAdded: "2023-05-03",
    completed: false,
  },
];

export default function Home() {
  const [habits, setHabits] = useState(initialHabits);
  const [streak, setStreak] = useState(5); // Mock streak data

  const addHabit = (newHabit) => {
    setHabits([
      ...habits,
      {
        ...newHabit,
        id: habits.length + 1,
        dateAdded: new Date().toISOString().split("T")[0],
        completed: false,
      },
    ]);
  };

  const toggleComplete = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const completedHabits = habits.filter((habit) => habit.completed).length;
  const progress = (completedHabits / habits.length) * 100;

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-stone-100">
          Habitual
        </h1>
        <Statistics progress={progress} streak={streak} />
        <HabitForm addHabit={addHabit} />
        <HabitTable habits={habits} toggleComplete={toggleComplete} />
      </div>
    </div>
  );
}
