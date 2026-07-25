import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "@/components/motion/reveal";
import { expressRates as expressConfig, type PickupWindow } from "@/config/pricing";
import { siteConfig } from "@/config/site";

export function PickupDetailsCard({
  location,
  setLocation,
  pickupDate,
  minDate,
  onPickupDateChange,
  pickupWindowLabel,
  setPickupWindowLabel,
  availableWindows,
  express,
  setExpress,
  couponCode,
  setCouponCode,
}: {
  location: string;
  setLocation: (value: string) => void;
  pickupDate: string;
  minDate: string;
  onPickupDateChange: (value: string) => void;
  pickupWindowLabel: string;
  setPickupWindowLabel: (value: string) => void;
  availableWindows: PickupWindow[];
  express: boolean;
  setExpress: (value: boolean) => void;
  couponCode: string;
  setCouponCode: (value: string) => void;
}) {
  return (
    <Reveal delay={0.1}>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <p className="font-medium">Pickup details</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="estimator-location">Pickup Location</Label>
              <Select value={location} onValueChange={(value) => setLocation(value ?? "")}>
                <SelectTrigger id="estimator-location" className="w-full">
                  <SelectValue placeholder="Choose your area" />
                </SelectTrigger>
                <SelectContent>
                  {siteConfig.contact.serviceAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="estimator-date">Preferred Pickup Date</Label>
              <Input
                id="estimator-date"
                type="date"
                min={minDate || undefined}
                value={pickupDate}
                onChange={(event) => onPickupDateChange(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="estimator-time">Preferred Pickup Time</Label>
              <Select
                value={pickupWindowLabel}
                onValueChange={(value) => setPickupWindowLabel(value ?? "")}
              >
                <SelectTrigger id="estimator-time" className="w-full">
                  <SelectValue placeholder="Choose a window" />
                </SelectTrigger>
                <SelectContent>
                  {availableWindows.map((window) => (
                    <SelectItem key={window.label} value={window.label}>
                      {window.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3.5 py-2.5">
              <div>
                <Label htmlFor="estimator-express">Express Delivery</Label>
                <p className="text-xs text-muted-foreground">
                  +{Math.round((expressConfig.multiplier - 1) * 100)}% • faster turnaround
                </p>
              </div>
              <Switch id="estimator-express" checked={express} onCheckedChange={setExpress} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="estimator-coupon">Coupon Code (optional)</Label>
            <Input
              id="estimator-coupon"
              placeholder="e.g. FIRST10"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              className="sm:w-64"
            />
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
