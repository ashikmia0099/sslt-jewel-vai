'use client'
import "./globals.css";
import { Lora } from 'next/font/google';
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'], 
  variable: '--font-lora',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lora.variable} data-theme="light">
      <body className="font-lora">
        <Provider store={store}>

          <Navbar />
          {children}
          <Footer />

        </Provider>
      </body>
    </html>
  );
}
