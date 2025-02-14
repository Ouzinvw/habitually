"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function HabitTable({
  habits,
  toggleComplete,
  removeHabit,
  allCompleted,
}) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-stone-400">
        No habits added yet. Start by adding a new habit above!
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-stone-800">
            <TableHead className="text-stone-300">Habit</TableHead>
            <TableHead className="text-stone-300">Goal</TableHead>
            <TableHead className="text-stone-300 hidden sm:table-cell">
              Priority
            </TableHead>
            <TableHead className="text-stone-300 w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habits.map((habit) => (
            <TableRow key={habit.id} className="border-b border-stone-700">
              <TableCell className="font-medium text-stone-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => toggleComplete(habit.id)}
                    disabled={allCompleted}
                    className={`border-stone-500 ${
                      habit.completed ? "bg-emerald-500" : ""
                    } ${allCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dotted border-stone-500">
                          {habit.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-stone-700 text-stone-200 border-stone-600">
                        <p>{habit.description || "No description provided"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell className="text-stone-300 =">
                {habit.goal || "N/A"}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold
                  ${
                    habit.priority === "Low"
                      ? "bg-emerald-900 text-emerald-200"
                      : habit.priority === "Medium"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {habit.priority}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHabit(habit.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
