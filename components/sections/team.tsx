import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

const team: TeamMember[] = [
  {
    name: "Maya Chen",
    role: "Co-Founder & CEO",
    bio: "Sets the product direction and spends more time than she would like reading fabric care labels.",
    initials: "MC",
  },
  {
    name: "David Okonkwo",
    role: "Co-Founder & CTO",
    bio: "Leads engineering for the sorting and scheduling systems that power every order.",
    initials: "DO",
  },
  {
    name: "Renee Castillo",
    role: "Operations Manager",
    bio: "Keeps every market running on schedule, from driver routes to facility throughput.",
    initials: "RC",
  },
  {
    name: "Jordan Blake",
    role: "Customer Support Lead",
    bio: "Leads the support team that answers questions and resolves order issues day to day.",
    initials: "JB",
  },
  {
    name: "Priya Suresh",
    role: "Logistics Coordinator",
    bio: "Plans pickup and delivery routes to keep windows accurate as new areas come online.",
    initials: "PS",
  },
  {
    name: "Ana Torres",
    role: "Laundry Care Specialist",
    bio: "Handles delicate and specialty fabrics that need a trained hand instead of a standard cycle.",
    initials: "AT",
  },
  {
    name: "Marcus Webb",
    role: "Laundry Care Specialist",
    bio: "Focuses on stain treatment and pre-wash inspection for every incoming order.",
    initials: "MW",
  },
];

export function Team() {
  return (
    <section className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Meet the team
          </span>
          <h2 className="mt-3">The people behind every order</h2>
          <p className="mt-4 text-muted-foreground">
            AI Laundry Basket is built by a small, hands-on team across
            product, operations, and laundry care.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 4) * 0.06}>
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-primary/30">
                <CardContent className="flex h-full flex-col items-center gap-3 text-center">
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary/10 font-heading text-base text-primary">
                      {member.initials}
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
