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
  title: "CurioUI | Animated Components",
  description: "Next-gen animated UI components by Curiositas",
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
