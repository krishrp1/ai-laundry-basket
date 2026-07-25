import { m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ContactFormSuccess({
  requestId,
  onReset,
}: {
  requestId: string | null;
  onReset: () => void;
}) {
  return (
    <m.div
      key="success"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-3 py-10 text-center"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-6" />
      </span>
      <p className="font-heading text-lg font-semibold">Message sent</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Thanks for reaching out. Our team will get back to you using your
        preferred contact method within one business day.
      </p>
      {requestId && (
        <Badge variant="outline" className="font-normal">
          Reference: {requestId}
        </Badge>
      )}
      <Button variant="outline" onClick={onReset}>
        Send another message
      </Button>
    </m.div>
  );
}
