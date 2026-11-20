import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soccer & NBA Predictions",
  description: "Free daily soccer and NBA predictions based on bookmaker odds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {/* Header */}
        <header className="bg-green-900 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-bold text-lg">
              Soccer & NBA Predictions
            </a>
            <nav className="flex gap-5 text-sm">
              <a href="/" className="hover:text-green-200">
                Home
              </a>
              <a href="/soccer" className="hover:text-green-200">
                Soccer
              </a>
              <a href="/nba" className="hover:text-green-200">
                NBA
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-10">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-xs text-gray-500">
            <p>
              For entertainment only. Not financial or betting advice. Gamble
              responsibly.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
