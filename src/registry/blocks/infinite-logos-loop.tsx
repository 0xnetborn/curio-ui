"use client";

export interface InfiniteLogosLoopProps {
  className?: string;
  logos?: { name: string; url: string }[];
}

const defaultLogos = [
  { name: "CurioUI", url: "/logo.svg" },
  { name: "React", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" },
  { name: "Next.js", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/512px-Nextjs-logo.svg.png" },
  { name: "TypeScript", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" },
  { name: "Tailwind", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png" },
  { name: "Framer", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Framer_Motion_logo.svg/512px-Framer_Motion_logo.svg.png" },
  { name: "Vercel", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_Logo.svg/512px-Vercel_Logo.svg.png" },
  { name: "GitHub", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/512px-GitHub_Invertocat_Logo.svg.png" },
  { name: "Node.js", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/512px-Node.js_logo.svg.png" },
];

export const InfiniteLogosLoop = ({
  className,
  logos = defaultLogos,
}: InfiniteLogosLoopProps) => {
  return (
    <div
      className={`group relative flex w-full overflow-hidden bg-background py-4 mask-logos ${className || ""}`}
    >
      {/* First set of logos */}
      <div className="flex animate-logo-cloud whitespace-nowrap hover:pause">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center mx-8"
          >
            <img
              src={logo.url}
              alt={logo.name}
              className="h-8 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Duplicate set for seamless loop */}
      <div className="flex animate-logo-cloud whitespace-nowrap hover:pause absolute left-full">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`duplicate-${logo.name}-${index}`}
            className="flex items-center justify-center mx-8"
          >
            <img
              src={logo.url}
              alt={logo.name}
              className="h-8 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteLogosLoop;
