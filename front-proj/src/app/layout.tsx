'use client';

import Header from "./components/header";
import "./globals.css"; // Certifique-se de importar o CSS global do Tailwind

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
