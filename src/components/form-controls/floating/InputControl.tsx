'use client';

import { Eye, EyeOff, Search, X } from 'lucide-react';
import React, { InputHTMLAttributes, forwardRef, useCallback, useState } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface HybridInputProps<T extends FieldValues = FieldValues>
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
    name: Path<T> | string;
    label?: string;
    description?: string;
    control?: Control<T>;
    reset?: boolean;
    error?: string;
    disableRHF?: boolean;
    onResetClick?: () => void;
    currency?: boolean;
    search?: boolean;
    forcelightmode?: boolean;
}

const formatValue = (type: string | undefined, rawValue: string) => {
    if (type === undefined) return rawValue.replace(/[^a-zA-Z\s]/g, '').trimStart();
    if (type === 'number') return rawValue.replace(/[^0-9]/g, '').trimStart();
    return rawValue;
};

// 1. Wrap the component function with forwardRef
const FloatingInputControllerInner = <T extends FieldValues>(
    {
        name,
        label,
        description,
        control,
        reset,
        error,
        disableRHF,
        onResetClick,
        className,
        forcelightmode = false,
        ...rest
    }: HybridInputProps<T>,
    ref: React.Ref<HTMLInputElement>
) => {
    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const resetField = useCallback(() => {
        form.resetField(name as Path<T>);
        onResetClick?.();
    }, []);

    const hasPrefix = rest.currency || rest.search;

    const lightModeClasses = forcelightmode ? '[&_label]:dark:bg-white [&_input]:dark:bg-white [&_input]:dark:border-gray-300 [&_input]:dark:text-muted [&_input]:dark:selection:text-foreground [&_label]:dark:text-muted/80' : "";

    // ==========================================
    // MODE 1: REACT-HOOK-FORM CONTROLLED
    // ==========================================
    if (isRHF) {
        return (
            <FormField
                control={control ?? form.control}
                name={name as Path<T>}
                disabled={rest.disabled}
                rules={{ required: rest.required ? `${label} is required` : undefined }}
                render={({ field }) => {
                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatValue(rest.type, e.target.value);
                        field.onChange(formatted);
                        rest.onChange?.(e);
                    };

                    // Merge RHF's ref with the forwarded custom ref
                    const handleRef = (e: HTMLInputElement | null) => {
                        field.ref(e); // Keep RHF's focus management intact
                        if (typeof ref === 'function') {
                            ref(e);
                        } else if (ref) {
                            (ref as React.RefObject<HTMLInputElement | null>).current = e;
                        }
                    };

                    return (
                        <FormItem className={cn("w-full gap-1", className, lightModeClasses)}>
                            <div className="relative h-10">
                                {rest.currency && (
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm">
                                        ₹
                                    </span>
                                )}

                                {rest.search && (
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                        <Search size={16} />
                                    </span>
                                )}

                                <Input
                                    {...rest}
                                    {...field}
                                    ref={handleRef} // Applied merged ref here
                                    className={cn("peer h-10", hasPrefix && "pl-8", (reset || rest.type === 'password') && "pr-8", "placeholder:text-transparent focus:placeholder:text-muted-foreground")}
                                    placeholder={rest.placeholder || " "}
                                    id={name as string}
                                    type={rest.type === 'number' ? 'text' : showPassword ? "text" : rest.type ?? 'text'}
                                    inputMode={rest.type === 'number' ? 'decimal' : 'text'}
                                    onChange={handleChange}
                                />
                                {label && (
                                    <Label
                                        className={cn(
                                            "absolute text-sm text-muted-foreground duration-300 dark:bg-card pointer-events-none",
                                            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
                                            "peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-1.5",
                                            "start-2 top-1.5 z-10 origin-left -translate-y-4 scale-90 transform bg-card px-1.5"
                                        )}
                                        htmlFor={name as string}
                                    >
                                        {label}
                                    </Label>
                                )}
                                {reset && field.value && (
                                    <button
                                        type='button'
                                        onClick={resetField}
                                        className="size-8 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                                {rest.type === 'password' && (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="size-8 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                )}
                            </div>
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
    const handleStandardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatValue(rest.type, e.target.value);
        e.target.value = formatted;
        rest.onChange?.(e);
    };

    return (
        <div className={cn("w-full space-y-2", className, lightModeClasses)}>
            <div className="relative">
                {rest.currency && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm">
                        ₹
                    </span>
                )}

                {rest.search && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <Search size={16} />
                    </span>
                )}

                <Input
                    {...rest}
                    ref={ref} // Direct assignment for uncontrolled standard mode
                    name={name as string}
                    id={name as string}
                    className={cn("peer h-10", hasPrefix && "pl-8", (reset || rest.type === 'password') && "pr-8", "placeholder:text-transparent focus:placeholder:text-muted-foreground")}
                    placeholder={rest.placeholder || " "}
                    type={rest.type === 'number' ? 'text' : showPassword ? "text" : rest.type ?? 'text'}
                    inputMode={rest.type === 'number' ? 'decimal' : 'text'}
                    onChange={handleStandardChange}
                />

                {label && (
                    <Label
                        className={cn(
                            "absolute text-sm text-muted-foreground duration-300 dark:bg-card pointer-events-none",
                            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
                            "peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-1.5",
                            "start-2 top-1.5 z-10 origin-left -translate-y-4 scale-90 transform bg-card px-1.5",
                            error && "text-destructive"
                        )}
                        htmlFor={name as string}
                    >
                        {label}
                    </Label>
                )}

                {reset && (
                    <button
                        type='button'
                        onClick={onResetClick}
                        className="size-8 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}

                {rest.type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="size-8 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

// 2. Export with a type assertion to retain the `<T extends FieldValues>` generic
export const FloatingInputController = forwardRef(FloatingInputControllerInner) as <
    T extends FieldValues
>(
    props: HybridInputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof FloatingInputControllerInner>;