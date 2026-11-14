import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soccer & NBA Predictions",
  description: "Free soccer and NBA predictions and odds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <header className="bg-green-900 text-white p-4 shadow">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Soccer & NBA Predictions</h1>
            <nav className="space-x-4 text-sm">
              <a href="/" className="hover:underline">Home</a>
              <a href="/soccer" className="hover:underline">Soccer</a>
              <a href="/nba" className="hover:underline">NBA</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto p-4">
          {children}
        </main>
        <footer className="text-center text-sm text-gray-500 py-6 border-t">
          For entertainment only. Not financial or betting advice. Gamble responsibly.
        </footer>
      </body>
    </html>
  );
}
