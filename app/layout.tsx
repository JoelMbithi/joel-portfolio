import type { Metadata } from 'next';
import { Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import SocialRail from './shared/SocialRail';   // ← add

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Joel Mbithi — Full Stack Developer',
  description: 'Portfolio of Joel Mbithi, full-stack developer (MERN & PERN).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <body>
        <Navbar />
        <SocialRail />               
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}