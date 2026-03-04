'use client';

import React, { forwardRef, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from "@/lib/utils";

export interface Option {
    label: string;
    value: string;
}

export interface HybridRadioGroupProps<T extends FieldValues = FieldValues> {
    name: Path<T> | string;
    label: string;
    options: Array<Option>;
    description?: string;
    className?: string;
    disabled?: boolean;
    defaultValue?: string;
    value?: string;
    control?: Control<T>;
    error?: string;
    disableRHF?: boolean;
    onValueChange?: (value: string) => void;
}

const RadioButtonInner = <T extends FieldValues>(
    {
        name,
        label,
        options,
        description,
        className,
        disabled,
        defaultValue,
        value,
        control,
        error,
        disableRHF,
        onValueChange,
    }: HybridRadioGroupProps<T>,
    ref: React.Ref<HTMLDivElement> // Radix UI RadioGroup forwards a div ref
) => {

    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    const [localValue, setLocalValue] = useState<string | undefined>(value || defaultValue);

    // ==========================================
    // MODE 1: REACT-HOOK-FORM CONTROLLED
    // ==========================================
    if (isRHF) {
        return (
            <FormField
                control={control ?? form.control}
                name={name as Path<T>}
                render={({ field }) => {
                    return (
                        <FormItem className={className}>
                            {label && (<FormLabel>{label}</FormLabel>)}
                            <FormControl>
                                <RadioGroup
                                    ref={field.ref}
                                    value={field.value}
                                    defaultValue={defaultValue}
                                    onValueChange={field.onChange}
                                    className="flex gap-4"
                                    disabled={disabled}
                                >
                                    {options?.map((item) => (
                                        <FormItem key={item.value} className="flex items-center space-x-1 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={item.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                                {item.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
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

    const displayValue = value !== undefined ? value : localValue;

    return (
        <div className={cn("space-y-2", className)}>
            {label && (<Label className={cn(error && "text-destructive")}>{label}</Label>)}
            <RadioGroup
                ref={ref}
                value={displayValue}
                defaultValue={defaultValue}
                onValueChange={handleStandardChange}
                disabled={disabled}
                className="flex gap-4"
                name={name as string}
            >
                {options?.map((item) => {
                    const itemId = `${name as string}-${item.value}`;
                    return (
                        <div key={item.value} className="flex items-center gap-2 space-x-1">
                            <RadioGroupItem value={item.value} id={itemId} />
                            <Label htmlFor={itemId} className="font-normal cursor-pointer">
                                {item.label}
                            </Label>
                        </div>
                    );
                })}
            </RadioGroup>
            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

// Export with a type assertion to retain the `<T extends FieldValues>` generic
export const RadioButtonController = forwardRef(RadioButtonInner) as <
    T extends FieldValues
>(
    props: HybridRadioGroupProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof RadioButtonInner>;