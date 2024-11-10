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
import { ErrorProvider } from "@/contexts/ErrorContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Depositee",
  description: "",
};

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-blue-500 font-medium">Loading...</span>
    </div>
  );
}

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
        <ErrorProvider>
        <AuthProvider>
            <Suspense fallback={<Loading />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
