import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentMeta } from "@/config/components";

interface ComponentCardProps {
    component: ComponentMeta;
    className?: string;
}

export function ComponentCard({ component, className }: ComponentCardProps) {
    return (
        <Link
            href={`/${component.slug}`}
            className={cn(
                "group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden",
                "h-[140px] transition-all duration-200 ease-out",
                "hover:border-accent/30 hover:shadow-[0_0_20px_rgba(13,148,136,0.08)] hover:scale-[1.01]",
                "active:scale-[0.99]",
                className
            )}
        >
            {/* Preview Area */}
            <div className="flex-1 bg-secondary/50 flex items-center justify-center">
                <span className="text-muted-foreground/40 text-xs font-mono">
                    Preview
                </span>
            </div>

            {/* Info Bar */}
            <div className="px-3 py-2.5 border-t border-border bg-card">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                        {component.name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {component.isNew && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-accent text-accent-foreground rounded">
                                New
                            </span>
                        )}
                        {component.isPremium && (
                            <span className="p-1 text-muted-foreground">
                                <LockKeyhole className="w-3 h-3" />
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-t from-accent/5 to-transparent" />
        </Link>
    );
}
