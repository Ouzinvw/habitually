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

export default function HabitTable({ habits, toggleComplete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-stone-800">
            <TableHead className="w-[100px] text-stone-300">Complete</TableHead>
            <TableHead className="text-stone-300">Name</TableHead>
            <TableHead className="text-stone-300">Goal</TableHead>
            <TableHead className="text-stone-300">Priority</TableHead>
            <TableHead className="text-stone-300">Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habits.map((habit) => (
            <TableRow key={habit.id} className="border-b border-stone-700">
              <TableCell className="text-stone-300">
                <Checkbox
                  checked={habit.completed}
                  onCheckedChange={() => toggleComplete(habit.id)}
                  className="border-stone-500 text-emerald-500"
                />
              </TableCell>
              <TableCell className="font-medium text-stone-200">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help border-b border-dotted border-stone-500">
                        {habit.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-stone-700 text-stone-200 border-stone-600">
                      <p>{habit.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-stone-300">{habit.goal}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    habit.priority === "low"
                      ? "bg-emerald-900 text-emerald-200"
                      : habit.priority === "medium"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {habit.priority}
                </span>
              </TableCell>
              <TableCell className="text-stone-300">
                {habit.dateAdded}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
