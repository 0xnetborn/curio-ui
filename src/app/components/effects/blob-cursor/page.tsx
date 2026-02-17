"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlobCursor from "@/registry/effects/blob-cursor";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const blobCursorCode = `"use client";

import BlobCursor from "@/registry/effects/blob-cursor";

export default function MyComponent() {
  return (
    <BlobCursor 
      fillColor="#5227FF" 
      trailCount={3}
    />
  );
}`;

const usageCode = `import BlobCursor from "@/registry/effects/blob-cursor";

<BlobCursor fillColor="#5227FF" trailCount={3} />`;

export default function BlobCursorPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Link
            href="/components"
            className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Blob Cursor</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Animated cursor with blob trail effect that follows mouse movement.
        </p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex flex-col gap-6 items-center justify-center py-20 min-h-[400px]">
            <p className="text-muted-foreground text-center">
              Move your cursor to see the blob effect
            </p>
            <BlobCursor 
              fillColor="#8B5CF6" 
              trailCount={3}
              className="absolute inset-0 pointer-events-none"
            />
          </div>
        }
        code={blobCursorCode}
        usage={usageCode}
      />
    </div>
  );
}
