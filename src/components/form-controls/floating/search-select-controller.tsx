'use client';

import { Check, ChevronDown, X } from 'lucide-react';
import React, { forwardRef, useCallback, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ResetButton } from './reset-button';

export interface Option {
    label: string;
    value: string;
}

export interface HybridSearchSelectProps<T extends FieldValues = FieldValues> {
    name: Path<T> | string;
    label: string;
    options: Array<Option>;
    description?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
    defaultValue?: string;
    value?: string;
    disabled?: boolean;
    control?: Control<T>;
    error?: string;
    disableRHF?: boolean;
    onValueChange?: (value: string) => void;
    reset?: boolean;
    onResetClick?: () => void;
}

const FloatingSearchSelectControllerInner = <T extends FieldValues>(
    {
        name,
        label,
        options,
        description,
        placeholder,
        searchPlaceholder = "Search...",
        className,
        defaultValue = "",
        value,
        disabled,
        control,
        error,
        disableRHF,
        onValueChange,
        reset,
        onResetClick,
    }: HybridSearchSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>
) => {
    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    const [open, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState<string>(value || defaultValue);

    // Label floats if popover is open OR if there is a selected value
    const getLabelClasses = (hasValue: boolean, hasError?: boolean) => cn(
        "absolute start-2 transform px-1.5 text-sm transition-all duration-300 pointer-events-none dark:bg-card bg-card z-10",
        hasValue || open
            ? "top-0 -translate-y-1/2 scale-90 text-muted-foreground start-1"
            : "top-1/2 -translate-y-1/2 scale-100 text-muted-foreground",
        hasError && "text-destructive"
    );

    const resetField = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (isRHF) {
            form.resetField(name as Path<T>);
        }
        setLocalValue("");
        onValueChange?.("");
        onResetClick?.();
    }, [form, name, isRHF, onValueChange, onResetClick]);

    // ==========================================
    // MODE 1: REACT-HOOK-FORM CONTROLLED
    // ==========================================
    if (isRHF) {
        return (
            <FormField
                control={control ?? form.control}
                name={name as Path<T>}
                render={({ field, fieldState }) => {
                    const currentValue = field.value || "";
                    const hasValue = !!currentValue;
                    const selectedOption = options.find((opt) => opt.value === currentValue);

                    const handleSelect = (val: string) => {
                        // Optional: Allow deselecting by clicking the same item again
                        const newValue = val === currentValue ? "" : val;
                        field.onChange(newValue);
                        onValueChange?.(newValue);
                        setOpen(false);
                    };

                    return (
                        <FormItem className={cn("w-full flex flex-col gap-2", className)}>
                            <div className="relative">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            ref={field.ref}
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            disabled={disabled}
                                            aria-invalid={!!fieldState.error}
                                            className={cn(
                                                "w-full h-10 rounded-sm justify-between items-center px-3 py-2 border-input bg-transparent hover:bg-transparent font-normal",
                                                "dark:bg-transparent dark:hover:bg-transparent dark:hover:border-input dark:border-gray-700 dark:focus-visible:border-primary/95"
                                            )}
                                        >
                                            <span className={cn("truncate max-w-[85%]", !hasValue && "text-transparent")}>
                                                {hasValue ? selectedOption?.label : (placeholder || "Select...")}
                                            </span>
                                            <ChevronDown className="size-4 shrink-0 text-muted-foreground opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="p-0"
                                        align="start"
                                        side='bottom'
                                        style={{ width: "var(--radix-popover-trigger-width)" }}
                                    >
                                        <Command>
                                            <CommandInput placeholder={searchPlaceholder} />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup className="max-h-48 overflow-auto">
                                                    {options.map((option) => (
                                                        <CommandItem
                                                            key={option.value}
                                                            value={option.label}
                                                            onSelect={() => handleSelect(option.value)}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 size-4",
                                                                    currentValue === option.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {option.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <Label
                                    htmlFor={name as string}
                                    className={getLabelClasses(hasValue, !!fieldState.error)}
                                >
                                    {label}
                                </Label>

                                {reset && hasValue && <ResetButton reset={(resetField)} className='right-9' />}
                            </div>
                            {description && <FormDescription>{description}</FormDescription>}
                            <FormMessage className="text-xs" />
                        </FormItem>
                    );
                }}
            />
        );
    }

    // ==========================================
    // MODE 2: STANDARD / UNCONTROLLED
    // ==========================================
    const currentValue = value !== undefined ? value : localValue;
    const hasValue = !!currentValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    const handleStandardSelect = (val: string) => {
        const newValue = val === currentValue ? "" : val;
        setLocalValue(newValue);
        onValueChange?.(newValue);
        setOpen(false);
    };

    return (
        <div className={cn("w-full space-y-2 flex flex-col", className)}>
            <div className="relative">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            ref={ref}
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            disabled={disabled}
                            aria-invalid={!!error}
                            className={cn(
                                "w-full h-10 rounded-sm justify-between items-center px-3 py-2 border-input bg-transparent hover:bg-transparent font-normal",
                                "dark:bg-transparent dark:hover:bg-transparent dark:hover:border-input dark:border-gray-700 dark:focus-visible:border-primary/95"
                            )}
                        >
                            <span className={cn("truncate max-w-[85%]", !hasValue && "text-transparent")}>
                                {hasValue ? selectedOption?.label : (placeholder || "Select...")}
                            </span>
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="p-0"
                        align="start"
                        side='bottom'
                        style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                        <Command>
                            <CommandInput placeholder={searchPlaceholder} />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup className="max-h-48 overflow-auto">
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            onSelect={() => handleStandardSelect(option.value)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 size-4",
                                                    currentValue === option.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Label
                    htmlFor={name as string}
                    className={getLabelClasses(hasValue, !!error)}
                >
                    {label}
                </Label>

                {reset && hasValue && <ResetButton reset={(resetField)} className='right-9' />}
            </div>

            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

export const FloatingSearchSelectController = forwardRef(FloatingSearchSelectControllerInner) as <
    T extends FieldValues
>(
    props: HybridSearchSelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof FloatingSearchSelectControllerInner>;