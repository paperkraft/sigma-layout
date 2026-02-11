import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectCOntrolProps {
    name: string;
    label?: string;
    value: any;
    onChange(value: string): void
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    description?: string;
    options: { label: string; value: string }[];
}

export default function SelectControl({
    name,
    label,
    value,
    onChange,
    placeholder,
    disabled,
    className,
    options,
    description = "",
}: SelectCOntrolProps) {
    return (
        <div className={cn("space-y-1 w-full", className)}>
            {label && (
                <Label htmlFor={name} className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</Label>
            )}
            <Select onValueChange={onChange} defaultValue={value} disabled={disabled}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder ?? "Select"} />
                </SelectTrigger>
                <SelectContent side='bottom' position="popper">
                    {options.map((item, idx) => (
                        <SelectItem key={item.value + idx} value={item.value}>{item.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {description && (<span className="text-[10px] text-muted-foreground">{description}</span>)}
        </div>
    );
}