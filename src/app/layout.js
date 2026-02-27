import Navbar from "@/components/Navbar";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Rencinema - Chill & Meal",
  description: "Discover movies you looking for with Rencinema",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/d1d0a6eeef.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-bg text-text min-h-screen">
        <Navbar />
        {children}
        <footer className="bg-surface border-t border-border py-8 text-center text-[#888] text-sm">
          <div className="max-w-7xl mx-auto px-6">
            <p>Powered by{" "}
              <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                TMDB
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}