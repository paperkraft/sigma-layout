'use client';

import { X } from 'lucide-react';
import React, { TextareaHTMLAttributes, forwardRef, useCallback } from 'react';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ResetButton } from './reset-button';

export interface HybridTextareaProps<T extends FieldValues = FieldValues>
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
    name: Path<T> | string;
    label?: string;
    description?: string;
    control?: Control<T>;
    reset?: boolean;
    error?: string;
    disableRHF?: boolean;
    onResetClick?: () => void;
}

const FloatingTextareaControllerInner = <T extends FieldValues>(
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
        ...rest
    }: HybridTextareaProps<T>,
    ref: React.Ref<HTMLTextAreaElement>
) => {
    const form = useFormContext<T>();
    const isRHF = !disableRHF && (!!control || !!form);

    const resetField = useCallback(() => {
        if (isRHF) {
            form.resetField(name as Path<T>);
        }
        onResetClick?.();
    }, [form, name, isRHF, onResetClick]);

    const endIconBase = "size-8 absolute right-1 top-5 -translate-y-1/2 flex justify-center items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded-sm";
    const resetIconClass = cn(endIconBase, "right-1");

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

                    return (
                        <FormItem className={cn("w-full", className)}>
                            <div className="relative">
                                <Textarea
                                    {...rest}
                                    {...field}
                                    id={name as string}
                                    placeholder={rest.placeholder || " "}
                                    className={cn(
                                        "peer min-h-20 pt-3 rounded-sm",
                                        "placeholder:text-transparent focus:placeholder:text-muted-foreground",
                                        "dark:bg-transparent dark:border-gray-700 dark:focus-visible:border-primary/95",
                                        reset && "pr-8"
                                    )}
                                    aria-invalid={!!fieldState.error}
                                />
                                {label && (
                                    <Label
                                        className={cn(
                                            "absolute text-sm text-muted-foreground duration-300 pointer-events-none bg-card",
                                            // Resting state: Anchored near the top instead of top-1/2
                                            "peer-placeholder-shown:top-5 peer-placeholder-shown:scale-100",
                                            // Floating state: Moves up and shrinks
                                            "peer-focus:top-0 peer-focus:scale-90 peer-focus:px-1.5",
                                            // Default floated state (when there is text)
                                            "start-2 top-0 z-10 origin-left -translate-y-2.5 scale-90 transform px-1.5",
                                            fieldState.error && "text-destructive"
                                        )}
                                        htmlFor={name as string}
                                    >
                                        {label}
                                    </Label>
                                )}
                                {reset && field.value && <ResetButton reset={(resetField)} />}
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
    const handleStandardChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        rest.onChange?.(e);
    };

    return (
        <div className={cn("w-full space-y-2", className)}>
            <div className="relative">
                <Textarea
                    {...rest}
                    ref={ref}
                    name={name as string}
                    id={name as string}
                    placeholder={rest.placeholder || " "}
                    onChange={handleStandardChange}
                    className={cn(
                        "peer min-h-20 pt-3 rounded-sm",
                        "placeholder:text-transparent focus:placeholder:text-muted-foreground",
                        "dark:bg-transparent dark:border-gray-700 dark:focus-visible:border-primary/95",
                        reset && "pr-8"
                    )}
                    aria-invalid={!!error}
                />

                {label && (
                    <Label
                        className={cn(
                            "absolute text-sm text-muted-foreground duration-300 pointer-events-none bg-card",
                            "peer-placeholder-shown:top-5 peer-placeholder-shown:scale-100",
                            "peer-focus:top-0 peer-focus:scale-90 peer-focus:px-1.5",
                            "start-2 top-0 z-10 origin-left -translate-y-2.5 scale-90 transform px-1.5",
                            error && "text-destructive"
                        )}
                        htmlFor={name as string}
                    >
                        {label}
                    </Label>
                )}

                {reset && rest.value && <ResetButton reset={(resetField)} />}
            </div>
            {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
            {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
        </div>
    );
};

export const FloatingTextareaController = forwardRef(FloatingTextareaControllerInner) as <
    T extends FieldValues
>(
    props: HybridTextareaProps<T> & { ref?: React.ForwardedRef<HTMLTextAreaElement> }
) => ReturnType<typeof FloatingTextareaControllerInner>;