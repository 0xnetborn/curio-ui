"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Counter from "@/registry/text/counter";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = `"use client";

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';



function Number({ mv, number, height }) {
  let y = useTransform(mv, latest => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({ place, value, height, digitStyle }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
  return (
    <div className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'white',
  fontWeight = 'bold',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle
}) {
  const height = fontSize + padding;
  const defaultCounterStyle = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight
  };
  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: \`linear-gradient(to bottom, \${gradientFrom}, \${gradientTo})\`
  };
  const defaultBottomGradientStyle = {
    height: gradientHeight,
    background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`
  };
  return (
    <div className="counter-container" style={containerStyle}>
      <div className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {places.map(place => (
          <Digit key={place} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </div>
      <div className="gradient-container">
        <div className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></div>
        <div
          className="bottom-gradient"
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
        ></div>
      </div>
    </div>
  );
}
`;

const usageCode = `import Counter from "@/registry/text/counter";

<Counter text="CurioUI" />`;

export default function CounterPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/text" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">Counter</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">Counter animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <Counter text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
