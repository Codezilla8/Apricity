import type { Metadata } from "next";
import { Inter, Crimson_Text, Lora, Quicksand } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Font configurations
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// NEW: Quicksand font for the title
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apricity - A Creative Haven",
  description: "A dreamy platform for poetry, art, and stories.  Where creativity finds warmth.",
  keywords: ["poetry", "art", "creative writing", "blog", "storytelling"],
};

export default function RootLayout({
  children,
}:  Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${crimson.variable} ${lora.variable} ${quicksand.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId="819575173504-iedtblp3pkubo7sqec88cs75912qjb47.apps.googleusercontent.com">
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
