import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InaRelay — Operations OS for Distributed-Energy Operators",
  description:
    "InaRelay helps PAYGo solar, mini-grid, and C&I operators resolve payment exceptions, support-linked arrears, and verification evidence gaps in one place. Protect revenue. Preserve trust. Prove performance.",
  openGraph: {
    title: "InaRelay — Operations OS for Distributed-Energy Operators",
    description:
      "Resolve the account cases that fall between payment, support, field, and reporting. Built for Nigerian solar operators.",
    siteName: "InaRelay",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InaRelay — Operations OS for Distributed-Energy Operators",
    description:
      "Resolve the account cases that fall between payment, support, field, and reporting.",
  },
  keywords: [
    "PAYGo solar operations",
    "mini-grid management",
    "solar collections software",
    "distributed energy Nigeria",
    "DARES verification",
    "payment exception workflow",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
