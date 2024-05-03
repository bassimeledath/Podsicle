import type { Metadata } from "next";
import '@/components/ui/global.css';
import { inter } from '@/components/ui/fonts';

export const metadata: Metadata = {
  title: "Podsicle",
  description: "Podsicle is an AI app for podcast generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}