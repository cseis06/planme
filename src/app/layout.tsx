import "./globals.css";
import { Pixelify_Sans } from "next/font/google";

import BottomNav from "@/components/navigation/BottomNav";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="es" className={pixelify.variable}>
        <body className="font-pixelify">
          {children}
          <BottomNav />
        </body>
      </html>
    </>
  );
}