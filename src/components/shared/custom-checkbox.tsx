import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox";

export const CustomCheckbox = ({ checked, onCheckedChange }: { checked: CheckedState; onCheckedChange: (value: boolean) => void }) => (
    <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label="Select row"
        className={"mx-2 translate-y-0.5 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-0 border-gray-400 shadow-none"}
    />
);