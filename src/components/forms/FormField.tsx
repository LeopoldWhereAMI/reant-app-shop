import { Label } from "../ui/label";

export type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <p
        id={`${id}-error`}
        role="alert"
        className="h-4 truncate text-xs leading-4 text-destructive"
        title={error}
      >
        {error}
      </p>
    </div>
  );
}
