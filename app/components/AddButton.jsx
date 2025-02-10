import { Button } from "@/components/ui/button";

export default function AddButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      Add Habit
    </Button>
  );
}
