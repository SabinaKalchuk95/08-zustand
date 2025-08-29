// app/not-found.tsx
import Link from 'next/link';
import css from './Home.module.css';

// Импортируем Metadata для правильной типизации
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub: Page Not Found',
  description: 'The page you are looking for does not exist. Please check the URL or return to the homepage.',
  openGraph: {
    title: 'NoteHub: Page Not Found',
    description: 'The page you are looking for does not exist. Please check the URL or return to the homepage.',
    url: 'https://your-domain.com/not-found', // Замените на свой домен
    images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back</Link>
    </>
  );
}