import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarStateProvider } from "@/hooks/use-sidebar-state";
import { MainContent } from "@/components/MainContent";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CurioKit | Premium Animated UI Components",
  description: "Next-gen animated UI components by Curiositas Studio. High-performance, fully customizable components for modern web experiences.",
  keywords: ["UI components", "animated components", "React", "Next.js", "animations", "UI library"],
  authors: [{ name: "Curiositas Studio" }],
  openGraph: {
    title: "CurioKit | Premium Animated UI Components",
    description: "Next-gen animated UI components by Curiositas Studio. High-performance, fully customizable components for modern web experiences.",
    url: "https://curiosokit.dev",
    siteName: "CurioKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CurioKit | Premium Animated UI Components",
    description: "Next-gen animated UI components by Curiositas Studio",
    creator: "@curiositas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarStateProvider>
            <Sidebar />
            <Header />
            <MainContent>{children}</MainContent>
          </SidebarStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
