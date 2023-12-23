import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GIF app",
  description: "GIF app using giphy api",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200 px-5 md:px-[10%]`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
