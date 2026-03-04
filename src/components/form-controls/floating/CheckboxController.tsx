'use client';

import React, { forwardRef, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface HybridCheckboxProps<T extends FieldValues = FieldValues> {
    name: Path<T> | string;
    label?: React.ReactNode | string;
    description?: React.ReactNode | string;
    className?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
    control?: Control<T>;
    error?: string;
    disableRHF?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const CheckboxControllerInner = <T extends FieldValues>(
    {
        name,
        label,
        description,
        className,
        disabled,
        defaultChecked,
        checked,
        control,
        error,
        disableRHF,
        onCheckedChange,
    }: HybridCheckboxProps<T>,
    ref: React.Ref<HTMLButtonElement> // Radix UI Checkbox forwards a button ref
) => {

    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    const [localChecked, setLocalChecked] = useState<boolean>(checked ?? defaultChecked ?? false);

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
                        <FormItem className={cn("flex flex-row items-center space-x-1 space-y-0", className)}>
                            <FormControl>
                                <Checkbox
                                    ref={field.ref}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                {label && (<FormLabel className="cursor-pointer">{label}</FormLabel>)}
                                {description && (<FormDescription>{description}</FormDescription>)}
                                <FormMessage className='text-xs' />
                            </div>
                        </FormItem>
                    );
                }}
            />
        );
    }

    // ==========================================
    // MODE 2: STANDARD / UNCONTROLLED
    // ==========================================
    const handleStandardChange = (val: boolean | "indeterminate") => {
        const isChecked = val === true;
        setLocalChecked(isChecked);
        onCheckedChange?.(isChecked);
    };

    const displayChecked = checked !== undefined ? checked : localChecked;
    const inputId = name as string;

    return (
        <div className={cn("flex flex-row items-center space-x-1 gap-2 space-y-0", className)}>
            <Checkbox
                ref={ref}
                id={inputId}
                checked={displayChecked}
                onCheckedChange={handleStandardChange}
                disabled={disabled}
                className='cursor-pointer'
            />

            <div className="space-y-1 leading-none">
                {label && (
                    <Label
                        htmlFor={inputId}
                        className={cn(
                            "font-medium cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                            error && "text-destructive"
                        )}
                    >
                        {label}
                    </Label>
                )}

                {description && (<p className="text-[0.8rem] text-muted-foreground">{description}</p>)}
                {error && (<p className="text-[0.8rem] font-medium text-destructive">{error}</p>)}
            </div>
        </div>
    );
};

// Export with a type assertion to retain the `<T extends FieldValues>` generic
export const CheckboxController = forwardRef(CheckboxControllerInner) as <
    T extends FieldValues
>(
    props: HybridCheckboxProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof CheckboxControllerInner>;