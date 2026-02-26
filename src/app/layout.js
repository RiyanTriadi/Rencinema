import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "MovieDB",
  description: "Discover movies with TMDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0d] text-[#f0f0f0] min-h-screen">
        <Navbar />
        {children}
        <footer className="bg-[#1a1a1a] border-t border-[#2e2e2e] py-8 text-center text-[#888] text-sm">
          <div className="max-w-[1280px] mx-auto px-6">
            <p>Powered by{" "}
              <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-[#e50914] hover:underline">
                TMDB
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}