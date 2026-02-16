"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  code: string;
  className?: string;
  onCopy?: () => void;
  copied?: boolean;
}

export function CopyButton({ code, className, onCopy, copied: externalCopied }: CopyButtonProps) {
  const [internalCopied, setInternalCopied] = useState(false);
  
  const isCopied = externalCopied !== undefined ? externalCopied : internalCopied;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setInternalCopied(true);
    onCopy?.();
    setTimeout(() => setInternalCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-1.5 rounded-md transition-colors",
        "hover:bg-secondary/80 text-muted-foreground hover:text-foreground",
        className
      )}
      title="Copy code"
    >
      {isCopied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
