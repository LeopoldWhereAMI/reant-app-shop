import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

export default function Loader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
      <LoaderCircle className="h-4 w-4 animate-spin" />
      <span>{children}</span>
    </div>
  );
}
