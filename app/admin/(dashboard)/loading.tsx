import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-64 items-center justify-center text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}
