"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <div className="p-4 border-b border-border">
          <Link href="/" className="font-display text-xl font-bold">
            CurioUI
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link href="/buttons" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary">
            <span>Buttons</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
