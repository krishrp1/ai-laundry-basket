import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const team = [
  {
    name: siteConfig.business.ownerName,
    role: siteConfig.business.ownerRole,
    bio: "Founded A&I Laundry Basket to bring convenient, reliable laundry service to Bengaluru.",
  },
  {
    name: siteConfig.business.opsName,
    role: siteConfig.business.opsRole,
    bio: "Manages day-to-day operations and customer support, so every order gets a prompt response.",
  },
];

export function Team() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Leadership
          </span>
          <h2 className="mt-3">The people behind A&I Laundry Basket</h2>
        </Reveal>

        <div className="mt-14 mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
                <CardContent className="flex h-full flex-col items-center gap-3 text-center">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary/10 font-heading text-base text-primary">
                      {initialsOf(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-primary">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
