import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

const playfair_display = Playfair_Display({
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Legenda Permata",
    template: `%s | Legenda Permata`,
  },
  description: "Legenda Permata official online store",
  metadataBase: new URL(SERVER_URL),
  keywords: [
    "Legenda Permata",
    "Permata Legenda",
    "Toko Permata",
    "Toko Cincin",
    "Toko Batu Cincin",
    "Batu Cincin",
    "Batu Mulia",
    "Logam Mulia",
    "Cincin Permata",
    "Permata",
    "Cincin",
    "Toko Idozz",
  ],
  openGraph: {
    description:
      "Legenda Permata adalah toko perhiasan online terpercaya yang menawarkan koleksi eksklusif perhiasan berlian, emas, dan permata berkualitas tinggi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair_display.variable} ${outfit.variable} bg-slate-50 antialiased`}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
