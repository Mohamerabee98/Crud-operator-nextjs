import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_Component/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Simple Crud Operatoer",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <Navbar />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
