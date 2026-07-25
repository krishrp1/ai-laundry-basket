import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/reveal";
import { services, type ServiceKey } from "@/config/pricing";

export function ServiceTypeCard({
  serviceKey,
  onServiceChange,
}: {
  serviceKey: ServiceKey;
  onServiceChange: (key: ServiceKey) => void;
}) {
  const selected = services.find((s) => s.key === serviceKey);

  return (
    <Reveal>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="estimator-service">Service Type</Label>
          <Select
            value={selected?.label}
            onValueChange={(value) => {
              const match = services.find((s) => s.label === value);
              if (match) onServiceChange(match.key);
            }}
          >
            <SelectTrigger id="estimator-service" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.key} value={service.label}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">{selected?.description}</p>
        </CardContent>
      </Card>
    </Reveal>
  );
}
