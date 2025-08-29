import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import 'modern-normalize';
import css from './Home.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

// 1. Налаштовуємо шрифт Roboto відповідно до ТЗ
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

// 2. Оновлюємо метадані відповідно до ТЗ
export const metadata: Metadata = {
  title: 'NoteHub: Your Personal Note-Taking App',
  description: 'Create, organize, and manage your notes effortlessly with NoteHub. Your personal space for ideas, to-do lists, and more.',
  openGraph: {
    title: 'NoteHub: Your Personal Note-Taking App',
    description: 'Create, organize, and manage your notes effortlessly with NoteHub. Your personal space for ideas, to-do lists, and more.',
    url: 'https://your-domain.com', // Замени на свой домен
    images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
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
      {/* 3. Используем класс шрифта Roboto */}
      <body className={roboto.className}>
        <TanStackProvider>
          <Header/>
          <main className={css.main}>{children} {modal}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}