import type * as React from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <section className="border-b bg-card">
      <div className="container-page py-12 lg:py-16">
        <h1 className="max-w-3xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
        {children}
      </div>
    </section>
  );
}
