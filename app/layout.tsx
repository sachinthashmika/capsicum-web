import Navbar from "@/components/ui/Navbar";
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#111111] text-white">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
