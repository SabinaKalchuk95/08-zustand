import { fetchNoteById } from '../../../../lib/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ id: string }>;
};

// SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const title = note.title;
  const description = note.content.substring(0, 100) + '...';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand.vercel.app/notes/${id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

// Сторінка
export default async function NotePreviewPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
