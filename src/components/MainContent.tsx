"use client";

import { useSidebarState } from "@/hooks/use-sidebar-state";

export function MainContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebarState();

    return (
        <main className={`pt-16 min-h-screen overflow-y-auto overflow-x-hidden relative transition-all duration-300 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
            <div className="p-8 lg:p-12 max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    );
}
