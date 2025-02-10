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

export default function HabitForm({ addHabit }) {
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    priority: "",
    goal: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(habit);
    setHabit({ name: "", description: "", priority: "", goal: "" });
  };

  const handleChange = (field) => (e) => {
    setHabit({ ...habit, [field]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-stone-800 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          id="name"
          label="Name"
          value={habit.name}
          onChange={handleChange("name")}
        />
        <FormInput
          id="description"
          label="Description"
          value={habit.description}
          onChange={handleChange("description")}
        />
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-stone-300"
          >
            Priority
          </label>
          <Select
            onValueChange={(value) => setHabit({ ...habit, priority: value })}
            required
          >
            <SelectTrigger className="bg-stone-700 border-stone-600 text-stone-200 focus:ring-emerald-500 focus:border-emerald-500">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-stone-700 border-stone-600 text-stone-200">
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FormInput
          id="goal"
          label="Goal"
          value={habit.goal}
          onChange={handleChange("goal")}
        />
      </div>
      <AddButton onClick={handleSubmit} />
    </form>
  );
}
