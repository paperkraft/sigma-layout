import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface InputControlProps {
    name: string;
    type?: 'text' | 'number';
    label?: string;
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
    value,
    onChange,
    placeholder,
    disabled,
    className,
    description = "",
    currency = false,
    search = false
}: InputControlProps) {
    return (
        <div className={cn("space-y-1.5 w-full", className)}>
            {label && (
                <Label
                    htmlFor={name}
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {label}
                </Label>
            )}
            <div className='relative'>
                {currency && <span className="absolute left-3 top-2 text-muted-foreground text-sm">₹</span>}
                {search && <span className="absolute left-3 top-2.5 text-muted-foreground text-sm"><Search size={16} /></span>}
                <Input
                    name={name}
                    type={type}
                    defaultValue={value}
                    onChange={(e) => onChange(type === 'number' ? +e.target.value : e.target.value)}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={cn((currency || search) && 'pl-8')}
                />
            </div>
            {description && (<span className="text-[10px] text-muted-foreground">{description}</span>)}
        </div>
    );
}