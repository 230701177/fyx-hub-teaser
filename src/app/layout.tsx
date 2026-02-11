import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FYX HUB — PLAN. PAIR. PERFORM.",
  description:
    "Plan. Pair. Perform. FYX HUB is the ultimate coding arena where skill is demonstrated under pressure. Join the waitlist for the most cinematic developer experience.",
  keywords: [
    "FYX HUB",
    "coding arena",
    "pair programming",
    "developer platform",
    "sprint coding",
  ],
  openGraph: {
    title: "FYX HUB — Enter The Arena",
    description: "Plan. Pair. Perform. This is not a course. This is an arena.",
    type: "website",
  },
  icons: {
    icon: "/fyx-logo-bg.svg",
    apple: "/fyx-logo-bg.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
