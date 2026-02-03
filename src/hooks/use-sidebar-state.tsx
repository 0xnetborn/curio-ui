"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarStateContextType {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const SidebarStateContext = createContext<SidebarStateContextType>({
    isCollapsed: false,
    setIsCollapsed: () => { },
});

export function SidebarStateProvider({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarStateContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {children}
        </SidebarStateContext.Provider>
    );
}

export function useSidebarState() {
    return useContext(SidebarStateContext);
}
