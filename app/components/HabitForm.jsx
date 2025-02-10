"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "./FormInput";
import AddButton from "./AddButton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HabitForm({ addHabit }) {
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    priority: "",
    goal: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!habit.name) {
      setError("Please enter a habit name.");
      return;
    }
    if (!habit.priority) {
      setError("Please select a priority.");
      return;
    }
    if (!habit.goal) {
      setError("Please enter a daily goal.");
      return;
    }

    addHabit(habit);
    setHabit({ name: "", description: "", priority: "", goal: "" });
  };

  const handleChange = (field) => (e) => {
    setHabit({ ...habit, [field]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-6 bg-stone-800 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          id="name"
          label="Habit"
          value={habit.name}
          onChange={handleChange("name")}
        />
        <FormInput
          id="description"
          label="Description (optional)"
          value={habit.description}
          onChange={handleChange("description")}
          required={false}
        />
        <FormInput
          id="goal"
          label="Daily goal"
          value={habit.goal}
          onChange={handleChange("goal")}
        />
        <div className="flex flex-col justify-end">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-stone-300 mb-2"
          >
            Priority
          </label>
          <Select
            onValueChange={(value) => setHabit({ ...habit, priority: value })}
            value={habit.priority}
          >
            <SelectTrigger className="bg-stone-700 border-stone-600 text-stone-200 focus:ring-emerald-500 focus:border-emerald-500">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-stone-700 border-stone-600 text-stone-200">
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <AddButton onClick={handleSubmit} />
    </form>
  );
}
