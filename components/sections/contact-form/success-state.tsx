import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactFormSuccess({
  requestId,
  onReset,
}: {
  requestId: string | null;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-10 text-center"
    >
      <CheckCircle2 className="size-10 text-success" />
      <p className="font-heading text-lg font-semibold">Message sent</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Thanks for reaching out. Our team will get back to you using your
        preferred contact method within one business day.
      </p>
      {requestId && (
        <p className="font-semibold">Reference: {requestId}</p>
      )}
      <Button variant="outline" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}
