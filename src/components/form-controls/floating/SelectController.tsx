'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface Option {
    label: string;
    value: string | number | boolean;
}

export interface HybridSelectProps<T extends FieldValues = FieldValues> {
    name: Path<T> | string;
    label: string;
    options: Array<Option>;
    description?: string;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
    control?: Control<T>;
    error?: string;
    disableRHF?: boolean;
    onValueChange?: (value: string) => void;
    forcelightmode?: boolean;
}

// 1. Wrap the component function with forwardRef
const FloatingSelectControllerInner = <T extends FieldValues>(
    {
        name,
        label,
        options,
        description,
        placeholder,
        className,
        defaultValue,
        value,
        disabled,
        control,
        error,
        disableRHF,
        onValueChange,
        forcelightmode = false,
    }: HybridSelectProps<T>,
    ref: React.Ref<HTMLButtonElement>
) => {

    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    // Track local selection state for standard/uncontrolled mode so the label floats correctly
    const [localValue, setLocalValue] = useState<string | undefined>(value || defaultValue);

    useEffect(() => {
        if (value) {
            setLocalValue(value);
        } else {
            setLocalValue(undefined);
        }
    }, [value, defaultValue]);

    // Centralized label classes
    const getLabelClasses = (hasValue: boolean, hasError?: boolean) => cn(
        "absolute start-2 transform px-1.5 text-sm transition-all duration-300 pointer-events-none dark:bg-card bg-card z-10",
        hasValue
            ? "top-1.5 origin-left -translate-y-4 scale-90 text-muted-foreground"
            : "top-1/2 -translate-y-1/2 scale-100 text-muted-foreground",
        hasError && "text-destructive"
    );

    const whiteContentClasses = forcelightmode ? "dark:bg-white dark:text-slate-900 border-slate-200" : "";
    const lightModeClasses = forcelightmode ? '[&_label]:dark:bg-white [&_button]:dark:bg-white [&_button]:dark:hover:bg-white [&_button]:dark:border-gray-300 [&_button]:dark:text-muted [&_button]:dark:selection:text-foreground [&_label]:dark:text-muted/80' : ''

    // ==========================================
    // MODE 1: REACT-HOOK-FORM CONTROLLED
    // ==========================================
    if (isRHF) {
        return (
            <FormField
                control={control ?? form.control}
                name={name as Path<T>}
                disabled={disabled}
                render={({ field, fieldState }) => {

                    return (
                        <FormItem className={cn("w-full [&_button]:w-full", className, lightModeClasses)}>
                            <Select
                                value={field.value}
                                defaultValue={field.value ?? defaultValue}
                                onValueChange={field.onChange}
                                disabled={disabled}
                            >
                                <SelectTrigger
                                    id={name as string}
                                    ref={field.ref}
                                    className="relative rounded-sm h-10 dark:bg-transparent dark:hover:bg-transparent drak:hover:border-input dark:border-gray-700 dark:focus-visible:border-primary/95"
                                    aria-invalid={!!fieldState.error}
                                >
                                    <Label
                                        htmlFor={name as string}
                                        className={getLabelClasses(!!field.value, !!fieldState.error)}
                                    >
                                        {label}
                                    </Label>
                                    <SelectValue placeholder={" "} />
                                </SelectTrigger>
                                <SelectContent side="bottom" position="popper" className={cn(whiteContentClasses)}>
                                    {options?.map((item, i) => (
                                        <SelectItem
                                            value={String(item.value)}
                                            key={`${i}.${item.value}`}
                                            className={cn(forcelightmode && "focus:dark:bg-primary/10 focus:dark:text-slate-900 cursor-pointer")}
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {description && <FormDescription>{description}</FormDescription>}
                            <FormMessage className='text-xs' />
                        </FormItem>
                    );
                }}
            />
        );
    }

    // ==========================================
    // MODE 2: STANDARD / UNCONTROLLED
    // ==========================================
    const handleStandardChange = (val: string) => {
        setLocalValue(val);
        onValueChange?.(val);
    };

    const hasValue = !!(value || localValue);

    return (
        <div className={cn("w-full [&_button]:w-full", className, lightModeClasses)}>
            <Select
                onValueChange={handleStandardChange}
                value={value || localValue}
                defaultValue={defaultValue}
                disabled={disabled}
            >
                <SelectTrigger
                    id={name as string}
                    ref={ref}
                    className="relative rounded-sm h-10 dark:bg-transparent dark:hover:bg-transparent drak:hover:border-input dark:border-gray-700 dark:focus-visible:border-primary/95"
                >
                    <Label
                        htmlFor={name as string}
                        className={getLabelClasses(hasValue, !!error)}
                    >
                        {label}
                    </Label>
                    <SelectValue placeholder={placeholder || " "} />
                </SelectTrigger>
                <SelectContent side="bottom" position="popper" className={cn(whiteContentClasses)}>
                    {options?.map((item, i) => (
                        <SelectItem
                            value={String(item.value)}
                            key={`${i}.${item.value}`}
                            className={cn(forcelightmode && "focus:dark:bg-primary/10 focus:dark:text-slate-900 cursor-pointer")}
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

// 2. Export with a type assertion to retain the `<T extends FieldValues>` generic
export const FloatingSelectController = forwardRef(FloatingSelectControllerInner) as <
    T extends FieldValues
>(
    props: HybridSelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof FloatingSelectControllerInner>;