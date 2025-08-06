import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import Navbar from "@/components/Navbar";
import DarkModeProvider from "@/context/DarkModeContext";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import ConditionalFooter from "./ConditionalFooter";
import Provider from "@/context/Provider";

export const metadata: Metadata = {
  title: "Varun Singh - Full Stack Developer",
  description: "Varun Singh is a Full Stack Developer with hands-on experience in React, Next.js, Node.js, and MongoDB. Passionate about crafting performant, scalable web applications and integrating AI-driven features to enhance user experiences.",
  keywords: "Varun Singh, Full Stack Developer, Web Developer, Portfolio, JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, AI-driven applications, software engineer",
  authors: [{ name: "Varun Singh" }],
  openGraph: {
    title: "Varun Singh - Full Stack Developer",
    description: "Full Stack Developer with hands-on experience in React, Next.js, Node.js, and MongoDB. Passionate about crafting performant, scalable web applications and integrating AI-driven features.",
    url: "https://varunsingh.vercel.app/",
    siteName: "Varun Singh Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/drxpgt8lk/image/upload/v1754508199/WhatsApp_Image_2025-04-14_at_03.10.57_a8779781_11zon_u9c4ul.jpg",
        width: 400,
        height: 200,
        alt: "Varun Singh - Full Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varun Singh - Full Stack Developer',
    creator: '@varunsingh',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <DarkModeProvider>
          <body className={`bg-white dark:bg-black`}>
            <Toaster position='bottom-right' />
            <Theme className="dark:!bg-black">
              <Navbar />
              {children}
              <Analytics />
              <ConditionalFooter />
            </Theme>
          </body>
        </DarkModeProvider>
      </Provider>
    </html>
  );
}