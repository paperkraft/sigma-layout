import { cn } from "@/lib/utils";

interface FormSelectProps {
  id?: string;
  name?: string;
  label?: string;
  value: any;
  onChange?: (e: any) => void;
  disabled?: boolean;
  className?: string;
  description?: string;
  options: { label: string; value: string }[];
  props?: any;
}

export const FormSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  disabled,
  className,
  options,
  description = "",
  props,
}: FormSelectProps) => (
  <div className={cn(className)}>
    {label && (
      <label
        htmlFor={id ?? label}
        className="block text-[11px] font-medium mb-1 text-foreground/80"
      >
        {label}
      </label>
    )}
    <select
      id={id ?? label}
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      {...props}
      className={cn(
        "w-full text-xs px-2.5 py-1.5 rounded border outline-none transition-all appearance-none",
        disabled
          ? "bg-muted text-muted-foreground border-border cursor-not-allowed"
          : "bg-background text-foreground border-input focus:border-primary focus:ring-1 focus:ring-primary"
      )}
    >
      {options.map((item, idx) => (
        <option key={item.value + idx} value={item.value} className="bg-background text-foreground">
          {item.label}
        </option>
      ))}
    </select>
    {description && <span className="text-[10px] text-muted-foreground">{description}</span>}
  </div>
);