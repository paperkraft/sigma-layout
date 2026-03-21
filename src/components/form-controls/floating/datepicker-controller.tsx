'use client';

import { format } from 'date-fns';
import React, { forwardRef, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { FloatingDateField } from './date-field';

export interface HybridDateControllerProps<T extends FieldValues = FieldValues> {
    name: Path<T> | string;
    label?: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    fromYear?: number;
    toYear?: number;
    disableFuture?: boolean;
    control?: Control<T>;
    error?: string;
    disableRHF?: boolean;
    forcelightmode?: boolean;
    onDateChange?: (dateString: string) => void;
    className?: string;
}

const FloatingDateControllerInner = <T extends FieldValues>(
    {
        name,
        label,
        description,
        defaultValue,
        value,
        disabled,
        readOnly,
        fromYear,
        toYear,
        disableFuture,
        control,
        error,
        disableRHF,
        onDateChange,
        className,
        forcelightmode,
    }: HybridDateControllerProps<T>,
    ref: React.Ref<any>
) => {

    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    // Local state for standard/uncontrolled mode. 
    // We store the string version ("yyyy-MM-dd") to match RHF behavior.
    const [localValue, setLocalValue] = useState<string>(value || defaultValue || "");

    // ==========================================
    // MODE 1: REACT-HOOK-FORM CONTROLLED
    // ==========================================
    if (isRHF) {
        return (
            <FormField
                control={control ?? form.control}
                name={name as Path<T>}
                render={({ field, fieldState }) => {

                    const handleChange = (date: Date | null) => {
                        const formatted = date ? format(date, "yyyy-MM-dd") : "";
                        field.onChange(formatted);
                    };

                    return (
                        <FormItem className={cn("w-full", className)}>
                            <FloatingDateField
                                ref={field.ref}
                                name={name as string}
                                label={label}
                                value={field.value ? new Date(field.value) : null}
                                onChange={handleChange}
                                disabled={disabled}
                                readOnly={readOnly}
                                fromYear={fromYear}
                                toYear={toYear}
                                disableFuture={disableFuture}
                                forcelightmode={forcelightmode}
                                error={!!fieldState.error as unknown as string}
                            />
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
    const handleStandardChange = (date: Date | null) => {
        const formatted = date ? format(date, "yyyy-MM-dd") : "";
        setLocalValue(formatted);
        onDateChange?.(formatted);
    };

    // Prioritize controlled value prop over local state
    const displayValue = value !== undefined ? value : localValue;

    return (
        <div className={cn("w-full space-y-2", className)}>
            <FloatingDateField
                ref={ref}
                name={name as string}
                label={label}
                value={displayValue ? new Date(displayValue) : null}
                onChange={handleStandardChange}
                disabled={disabled}
                readOnly={readOnly}
                fromYear={fromYear}
                toYear={toYear}
                disableFuture={disableFuture}
                forcelightmode={forcelightmode}
                error={error}
            />
            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

// Export with a type assertion to retain the `<T extends FieldValues>` generic
export const FloatingDateController = forwardRef(FloatingDateControllerInner) as <
    T extends FieldValues
>(
    props: HybridDateControllerProps<T> & { ref?: React.ForwardedRef<any> }
) => ReturnType<typeof FloatingDateControllerInner>;