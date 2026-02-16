'use client';

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectControlProps {
    name: string;
    label?: string;
    label_bg?: string;
    value: any;
    onChange(value: string): void;
    disabled?: boolean;
    className?: string;
    description?: string;
    options: { label: string; value: string }[];
}

export default function SelectControl({
    name,
    label,
    label_bg = 'bg-background',
    value,
    onChange,
    disabled,
    className,
    options,
    description = "",
}: SelectControlProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Label floats if a value is selected OR if the dropdown is currently open
    const isFloating = value || isOpen;

    return (
        <div className={cn("space-y-1 w-full", className)}>
            <Select
                onValueChange={onChange}
                value={value}
                disabled={disabled}
                onOpenChange={setIsOpen}
            >
                <SelectTrigger className="relative w-full h-9" id={name}>
                    <SelectValue placeholder="" />

                    {label && (
                        <Label
                            htmlFor={name}
                            className={cn(
                                "absolute left-2 transition-all duration-200 px-1 pointer-events-none text-muted-foreground",
                                label_bg,
                                isFloating
                                    ? "-top-2 scale-75 translate-y-0 origin-left" // Floating position (on the border)
                                    : "top-1/2 -translate-y-1/2 scale-100"       // Centered position
                            )}
                        >
                            {label}
                        </Label>
                    )}
                </SelectTrigger>

                <SelectContent side="bottom" position="popper">
                    {options.map((item, idx) => (
                        <SelectItem key={item.value + idx} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {description && (
                <span className="text-[10px] text-muted-foreground px-1">{description}</span>
            )}
        </div>
    );
}