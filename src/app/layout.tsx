import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../../components/theme/theme-provider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahsa Khakpour | Developer Portfolio",
  description: "Personal portfolio website showcasing front-end development projects, UI/UX designs, and full-stack applications. Built with Next.js, React, and modern web technologies.",
  keywords: "portfolio, front-end developer, web developer, Next.js, React, UI/UX, full-stack, Mahsa Khakpour, developer portfolio",
  authors: [{ name: "Mahsa Khakpour" }],
  creator: "Mahsa Khakpour",
  publisher: "Mahsa Khakpour",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mahsa Khakpour | Developer Portfolio",
    description: "Explore my portfolio of web development projects, UI/UX designs, and professional experience. Front-end developer focused on creating structured, user-friendly modern web experiences.",
    url: "https://www.mahsa.website",
    siteName: "Mahsa Khakpour Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Mahsa Khakpour Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Mahsa Khakpour | Developer Portfolio",
    description: "Explore my portfolio of web development projects, UI/UX designs, and professional experience.",
    images: ["/logo.png"],
    creator: "@mahsakhakpour",
    site: "@mahsakhakpour",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://www.mahsa.website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="red" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main style={{ 
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
          }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}