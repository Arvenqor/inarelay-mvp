import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InaRelay Operator Preview",
  description: "Exception-operations demo and validation surface for distributed-energy operators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
