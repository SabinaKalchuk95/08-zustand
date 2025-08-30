import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import 'modern-normalize';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

// Підключаємо Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub: Your Personal Note-Taking App',
  description: 'Create, organize, and manage your notes effortlessly with NoteHub. Your personal space for ideas, to-do lists, and more.',
  openGraph: {
    title: 'NoteHub: Your Personal Note-Taking App',
    description: 'Create, organize, and manage your notes effortlessly with NoteHub. Your personal space for ideas, to-do lists, and more.',
    url: '08-zustand-git-main-sabinas-projects-fe24fbb9.vercel.app',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <Header />
          <main>{children} {modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
