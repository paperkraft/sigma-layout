'use client';

import { Check, ChevronDown, X } from 'lucide-react';
import React, { forwardRef, useCallback, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
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

export interface HybridMultiSelectProps<T extends FieldValues = FieldValues> {
    name: Path<T> | string;
    label: string;
    options: Array<Option>;
    description?: string;
    placeholder?: string;
    className?: string;
    defaultValue?: string[];
    value?: string[];
    disabled?: boolean;
    control?: Control<T>;
    error?: string;
    disableRHF?: boolean;
    onValueChange?: (value: string[]) => void;
    reset?: boolean;
    onResetClick?: () => void;
}

const FloatingMultiSelectControllerInner = <T extends FieldValues>(
    {
        name,
        label,
        options,
        description,
        placeholder,
        className,
        defaultValue = [],
        value,
        disabled,
        control,
        error,
        disableRHF,
        onValueChange,
        reset,
        onResetClick,
    }: HybridMultiSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>
) => {
    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    const [open, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState<string[]>(value || defaultValue);

    // Label floats if popover is open OR if there are selected values
    const getLabelClasses = (hasValues: boolean, hasError?: boolean) => cn(
        "absolute start-2 transform px-1.5 text-sm transition-all duration-300 pointer-events-none dark:bg-card bg-card z-10",
        hasValues || open
            ? "top-0 -translate-y-1/2 scale-90 text-muted-foreground start-1.5"
            : "top-1/2 -translate-y-1/2 scale-100 text-muted-foreground",
        hasError && "text-destructive"
    );

    const resetField = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (isRHF) {
            form.resetField(name as Path<T>);
        }
        setLocalValue([]);
        onValueChange?.([]);
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
                    const currentValues: string[] = Array.isArray(field.value) ? field.value : [];

                    const handleToggle = (val: string) => {
                        const updated = currentValues.includes(val)
                            ? currentValues.filter((item) => item !== val)
                            : [...currentValues, val];
                        field.onChange(updated);
                        onValueChange?.(updated);
                    };

                    const hasValues = currentValues.length > 0;

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
                                                "w-full min-h-10 rounded-sm h-auto justify-between items-center px-3 py-2 border-input bg-transparent hover:bg-transparent font-normal",
                                                "dark:bg-transparent dark:hover:bg-transparent dark:hover:border-input dark:border-gray-700 dark:focus-visible:border-primary/95"
                                            )}
                                        >
                                            <div className="flex flex-wrap gap-1">
                                                {hasValues ? (
                                                    currentValues.map((val) => {
                                                        const option = options.find((o) => o.value === val);
                                                        if (!option) return null;
                                                        return (
                                                            <Badge
                                                                variant="secondary"
                                                                key={val}
                                                                className="rounded-sm px-1 font-normal"
                                                            >
                                                                {option.label}
                                                                <div
                                                                    role="button"
                                                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                    }}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        handleToggle(val);
                                                                    }}
                                                                >
                                                                    <X className="size-3 text-muted-foreground hover:text-foreground" />
                                                                </div>
                                                            </Badge>
                                                        );
                                                    })
                                                ) : (
                                                    <span className="text-transparent">{placeholder || "Select items"}</span>
                                                )}
                                            </div>
                                            <ChevronDown className="size-4 shrink-0 text-muted-foreground opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" align="start" side='bottom' style={{ width: "var(--radix-popover-trigger-width)" }}>
                                        <Command>
                                            <CommandInput placeholder={placeholder || "Search..."} />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup className="max-h-48 overflow-auto">
                                                    {options.map((option) => {
                                                        const isSelected = currentValues.includes(option.value);
                                                        return (
                                                            <CommandItem
                                                                key={option.value}
                                                                onSelect={() => handleToggle(option.value)}
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        "mr-2 flex size-4 items-center justify-center rounded border border-primary",
                                                                        isSelected
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "opacity-50 [&_svg]:invisible"
                                                                    )}
                                                                >
                                                                    <Check className="size-4 text-white" />
                                                                </div>
                                                                {option.label}
                                                            </CommandItem>
                                                        );
                                                    })}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <Label
                                    htmlFor={name as string}
                                    className={getLabelClasses(hasValues, !!fieldState.error)}
                                >
                                    {label}
                                </Label>

                                {reset && hasValues && <ResetButton reset={(resetField)} className='right-9' />}
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
    const currentValues = value !== undefined ? value : localValue;

    const handleStandardToggle = (val: string) => {
        const updated = currentValues.includes(val)
            ? currentValues.filter((item) => item !== val)
            : [...currentValues, val];
        setLocalValue(updated);
        onValueChange?.(updated);
    };

    const hasValues = currentValues.length > 0;

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
                                "w-full min-h-10 rounded-sm h-auto justify-between items-center px-3 py-2 border-input bg-transparent font-normal",
                                "hover:bg-transparent",
                                "dark:bg-transparent dark:hover:bg-transparent dark:hover:border-input dark:border-gray-700 dark:focus-visible:border-primary/95"
                            )}
                        >
                            <div className="flex flex-wrap gap-1">
                                {hasValues ? (
                                    currentValues.map((val) => {
                                        const option = options.find((o) => o.value === val);
                                        if (!option) return null;
                                        return (
                                            <Badge
                                                variant="secondary"
                                                key={val}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                                <div
                                                    role="button"
                                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleStandardToggle(val);
                                                    }}
                                                >
                                                    <X className="size-3 text-muted-foreground hover:text-foreground" />
                                                </div>
                                            </Badge>
                                        );
                                    })
                                ) : (
                                    <span className="text-transparent">{placeholder || "Select items"}</span>
                                )}
                            </div>
                            <ChevronDown className="size-4 shrink-0 text-muted-foreground opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start" side='bottom' style={{ width: "var(--radix-popover-trigger-width)" }}>
                        <Command>
                            <CommandInput placeholder={placeholder || "Search..."} />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup className="max-h-48 overflow-auto">
                                    {options.map((option) => {
                                        const isSelected = currentValues.includes(option.value);
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                onSelect={() => handleStandardToggle(option.value)}
                                            >
                                                <div
                                                    className={cn(
                                                        "mr-2 flex size-4 items-center justify-center rounded border border-primary",
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground"
                                                            : "opacity-50 [&_svg]:invisible"
                                                    )}
                                                >
                                                    <Check className="size-4 text-white" />
                                                </div>
                                                {option.label}
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Label
                    htmlFor={name as string}
                    className={getLabelClasses(hasValues, !!error)}
                >
                    {label}
                </Label>

                {reset && hasValues && <ResetButton reset={(resetField)} className='right-9' />}
            </div>

            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

export const FloatingMultiSelectController = forwardRef(FloatingMultiSelectControllerInner) as <
    T extends FieldValues
>(
    props: HybridMultiSelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof FloatingMultiSelectControllerInner>;