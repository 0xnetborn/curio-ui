import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // Light styles
      "bg-card border border-border",
      // Dark styles with neon-tinted glow
      "dark:bg-card dark:[box-shadow:0_0_0_1px_rgba(50,255,159,0.05),inset_0_-20px_80px_-20px_rgba(50,255,159,0.03)]",
      // Hover effects
      "transition-all duration-300 hover:border-neon/20 hover:shadow-[0_0_30px_-10px_rgba(50,255,159,0.15)]",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 overflow-hidden">{background}</div>
    <div className="relative z-10 p-6 flex flex-col h-full">
      <div className="flex flex-col gap-3 transition-all duration-300 lg:group-hover:-translate-y-8">
        <Icon className="h-10 w-10 text-neon transition-all duration-300 group-hover:scale-90" />
        <h3 className="font-display text-xl font-semibold text-foreground">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {href && cta && (
        <div
          className={cn(
            "mt-auto pt-4 flex w-full",
            "lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            "transition-all duration-300"
          )}
        >
          <Button
            variant="link"
            asChild
            size="sm"
            className="p-0 h-auto text-neon hover:text-neon-muted"
          >
            <a href={href} className="flex items-center gap-1.5">
              {cta}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
      )}
    </div>

    {/* Hover overlay */}
    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-neon/[0.02]" />
  </div>
);

export { BentoCard, BentoGrid };
