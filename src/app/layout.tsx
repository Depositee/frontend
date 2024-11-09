import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import '@fontsource/geist-mono/100.css';
import '@fontsource/geist-mono/200.css';
import '@fontsource/geist-mono/300.css';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';
import '@fontsource/geist-mono/600.css';
import '@fontsource/geist-mono/700.css';
import '@fontsource/geist-mono/800.css';
import '@fontsource/geist-mono/900.css';
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Depositee",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans`}
      >
        <AuthProvider>
          <Navbar></Navbar>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
