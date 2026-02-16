'use client';

import { Search } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputControlProps {
    name: string;
    type?: 'text' | 'number';
    label?: string;
    label_bg?: string;
    value: any;
    onChange(value: string | number): void
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    description?: string;
    currency?: boolean;
    search?: boolean;
}

export default function InputControl({
    name,
    type = 'text',
    label,
    label_bg = 'bg-background',
    value,
    onChange,
    placeholder,
    disabled,
    className,
    description = "",
    currency = false,
    search = false
}: InputControlProps) {
    const [isFocused, setIsFocused] = useState(false);

    // Local state allows the input to update instantly.
    const [localValue, setLocalValue] = useState<string | number>("");

    // Sync local state when the parent's value prop changes
    // (e.g. initial load, or form reset)
    useEffect(() => {
        setLocalValue(value === null || value === undefined ? "" : value);
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        // 1. Update UI immediately so it feels snappy
        setLocalValue(rawValue);

        // 2. Handle Number Logic
        if (type === 'number') {
            // Allow empty string to clear the field
            if (rawValue === '') {
                onChange('');
                return;
            }

            // Only pass valid numbers to the parent.
            const parsed = parseFloat(rawValue);
            onChange(parsed);

        } else {
            // Standard text behavior
            onChange(rawValue);
        }
    };

    const hasPrefix = currency || search;

    // Use localValue for floating logic so the label moves instantly
    const isFloating = isFocused || (localValue !== "" && localValue !== null && localValue !== undefined);

    return (
        <div className={cn("space-y-1.5 w-full", className)}>
            <div className='relative'>
                {currency && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm">
                        ₹
                    </span>
                )}
                {search && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <Search size={16} />
                    </span>
                )}

                <Input
                    id={name}
                    name={name}
                    // type={type === 'number' ? 'text' : type} // Trick: Use 'text' for numbers to prevent scrolling/validation glitches
                    type={type ?? 'text'}
                    inputMode={type === 'number' ? 'decimal' : 'text'} // Ensures number pad on mobile
                    value={localValue}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder={isFocused ? placeholder : ""}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        hasPrefix ? 'pl-8' : '',
                        "h-9"
                    )}
                />

                {label && (
                    <Label
                        htmlFor={name}
                        className={cn(
                            "absolute px-1 text-muted-foreground transition-all duration-200 pointer-events-none",
                            label_bg,
                            isFloating
                                ? "-top-2 left-2 scale-75 origin-left"
                                : cn(
                                    "top-1/2 -translate-y-1/2 scale-100",
                                    hasPrefix ? "left-8" : "left-3"
                                )
                        )}
                    >
                        {label}
                    </Label>
                )}
            </div>

            {description && (
                <span className="text-[10px] text-muted-foreground px-1">{description}</span>
            )}
        </div>
    );
}