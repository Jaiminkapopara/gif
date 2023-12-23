import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GIF app",
  description: "GIF app using giphy api",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F1F2F3] px-5 md:px-[10%]`}>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#333",
              color: "#fff",
              minWidth: "270px",
            },
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
