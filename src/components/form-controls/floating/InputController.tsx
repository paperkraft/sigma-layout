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
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const formatValue = (type: string | undefined, rawValue: string) => {
    if (type === undefined) return rawValue.replace(/[^a-zA-Z\s]/g, '').trimStart();
    if (type === 'number') return rawValue.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
    if (type === 'tel') return rawValue.replace(/[^0-9]/g, '');
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
        search,
        currency,
        leftIcon,
        rightIcon,
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
        if (isRHF) {
            form.resetField(name as Path<T>);
        }
        onResetClick?.();
    }, [form, name, isRHF, onResetClick]);

    const hasPrefix = currency || search;

    const lightModeClasses = forcelightmode ? '[&_label]:dark:bg-white [&_input]:dark:bg-white [&_input]:dark:border-gray-300 [&_input]:dark:text-muted [&_input]:dark:selection:text-foreground [&_label]:dark:text-muted/80' : "";
    const endIconBase = "size-8 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded-sm";
    const starIconbase = "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none cursor-pointer";
    const resetIconClass = cn(endIconBase, "right-1");
    const passwordIconClass = cn(endIconBase, reset ? "right-9" : "right-1");
    const endIconClass = cn(endIconBase, (reset && rest.value) ? "right-9" : "right-1");

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
                render={({ field, fieldState }) => {

                    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatValue(rest.type, e.target.value);
                        field.onChange(formatted);
                    };

                    return (
                        <FormItem className={cn("w-full", className, lightModeClasses)}>
                            <div className="relative h-10">

                                {currency && (<span className={cn(starIconbase, 'text-sm')}>₹</span>)}
                                {search && (<span className={cn(starIconbase)}><Search size={16} /></span>)}
                                {leftIcon && <span className={cn(starIconbase)}>{leftIcon}</span>}

                                <Input
                                    {...rest}
                                    {...field}
                                    ref={field.ref}
                                    id={name as string}
                                    placeholder={rest.placeholder || " "}
                                    onChange={handleChange}
                                    type={rest.type === 'number' ? 'text' : showPassword ? "text" : rest.type ?? 'text'}
                                    inputMode={
                                        rest.type === 'number' ? 'decimal' :
                                            rest.type === 'email' ? 'email' :
                                                rest.type === 'tel' ? 'tel' :
                                                    rest.type === 'search' ? 'search' :
                                                        'text'
                                    }
                                    className={cn(
                                        "h-10 peer placeholder:text-transparent focus:placeholder:text-muted-foreground dark:bg-transparent dark:border-gray-700 dark:focus-visible:border-primary/95",
                                        hasPrefix && "pl-8",
                                        (reset || rest.type === 'password') && "pr-8",
                                    )}
                                    aria-invalid={!!fieldState.error}
                                />

                                {label && (
                                    <Label
                                        className={cn(
                                            "absolute text-sm text-muted-foreground duration-300 pointer-events-none bg-card",
                                            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
                                            "peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-1.5",
                                            "start-2 top-1.5 z-10 origin-left -translate-y-4 scale-90 transform px-1.5",
                                            fieldState.error && "text-destructive"
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
                                        className={resetIconClass}
                                        aria-label='Reset field'
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                                {rest.type === 'password' && (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={passwordIconClass}
                                        aria-label='Toggle password'
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                )}
                                {rightIcon && <div className={cn(endIconClass)}>{rightIcon}</div>}
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
        <div className={cn("w-full", className, lightModeClasses)}>
            <div className="relative h-10">
                {currency && (<span className={cn(starIconbase, 'text-sm')}>₹</span>)}
                {search && (<span className={cn(starIconbase)}><Search size={16} /></span>)}
                {leftIcon && <span className={cn(starIconbase)}>{leftIcon}</span>}

                <Input
                    {...rest}
                    ref={ref}
                    id={name as string}
                    name={name as string}
                    placeholder={rest.placeholder || " "}
                    onChange={handleStandardChange}
                    type={rest.type === 'number' ? 'text' : showPassword ? "text" : rest.type ?? 'text'}
                    inputMode={
                        rest.type === 'number' ? 'decimal' :
                            rest.type === 'email' ? 'email' :
                                rest.type === 'tel' ? 'tel' :
                                    rest.type === 'search' ? 'search' :
                                        'text'
                    }
                    className={cn(
                        "peer h-10 placeholder:text-transparent focus:placeholder:text-muted-foreground dark:bg-transparent dark:border-gray-700 dark:focus-visible:border-primary/95",
                        hasPrefix && "pl-8",
                        (reset || rest.type === 'password') && "pr-8"
                    )}
                    aria-invalid={!!error}
                />

                {label && (
                    <Label
                        className={cn(
                            "absolute text-sm text-muted-foreground duration-300 pointer-events-none",
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

                {reset && rest.value && (
                    <button
                        type='button'
                        onClick={onResetClick}
                        className={resetIconClass}
                        aria-label='Reset field'
                    >
                        <X size={16} />
                    </button>
                )}

                {rest.type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={passwordIconClass}
                        aria-label='Toggle password'
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}

                {rightIcon && <div className={cn(endIconClass)}>{rightIcon}</div>}
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