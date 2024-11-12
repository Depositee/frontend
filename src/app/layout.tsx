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
import ErrorBoundary from "@/boundary/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import React from "react";
import Loading from "@/components/loading";
import { ErrorProvider } from "@/contexts/ErrorContext";

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
        <ErrorProvider>
          <ErrorBoundary>
            <AuthProvider>
              <React.Suspense fallback={<Loading />}>
              <Navbar/>
              </React.Suspense>
              <React.Suspense fallback={<Loading />}>
                {children}
              </React.Suspense>
              <React.Suspense fallback={<Loading />}>
                <ToastContainer/>
              </React.Suspense>
            </AuthProvider>
          </ErrorBoundary>
        </ErrorProvider>
      </body>
    </html>
  );
}
