import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormInput({
  id,
  label,
  value,
  onChange,
  required = true,
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-stone-300">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-stone-700 border-stone-600 text-stone-200 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  );
}
