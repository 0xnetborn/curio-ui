export const threeDButtonCode = `const ThreeDButton = () => {
  return (
    <button className="group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-accent bg-gradient-to-tr from-accent to-accent-foreground px-4 py-1 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-accent-foreground active:shadow-none">
      <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
      <span className="relative font-medium">SyntaxUI</span>
    </button>
  )
}

export default ThreeDButton;`;

export const borderGlowButtonCode = `import React from 'react';

const BorderGlowButton = () => {
  const ref = React.useRef(null);
  const [mousePosition, setMousePosition] = React.useState({ x: '-100%', y: '-100%' });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: x + 'px', y: y + 'px' });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <button ref={ref} className="relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90">
      <span className={\`absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(var(--accent)_0%,transparent_70\%)]\`} style={{ left: mousePosition.x, top: mousePosition.y }}></span>
      <div className="relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90 px-4 py-1 text-xs text-accent backdrop-blur-sm">SyntaxUI</div>
    </button>
  );
};

export default BorderGlowButton;`;

export const gradientFillButtonCode = `const GradientFillButton = () => {
  return (
    <button className="group/button relative overflow-hidden rounded-md border border-accent/20 bg-white px-4 py-1 text-xs font-medium text-accent transition-all duration-150 hover:border-accent active:scale-95">
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-accent to-accent-foreground transition-all duration-500 group-hover/button:h-full"></span>
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">SyntaxUI</span>
    </button>
  )
}

export default GradientFillButton;`;

export const shineButtonCode = `const ShineButton = () => {
  return (
    <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-accent/30">
      <span className="text-sm">SyntaxUI</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  )
}

export default ShineButton;`;
