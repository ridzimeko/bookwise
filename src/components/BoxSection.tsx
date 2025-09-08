import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  actions: ReactNode;
  className?: string
  children: ReactNode
}

function BoxSection({ title, actions, className, children }: Props) {
  return (
    <section className={cn("w-full rounded-2xl bg-white p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {actions}
      </div>

      <div className="mt-8">
        {children}
      </div>
    </section>
  );
}

export default BoxSection;
