
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub: Create a New Note',
  description: 'Create a new note and save your ideas with NoteHub.',
  openGraph: {
    title: 'NoteHub: Create a New Note',
    description: 'Create a new note and save your ideas with NoteHub.',
    url: 'https://08-zustand-snowy-kappa.vercel.app/', 
      images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub image logo',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}