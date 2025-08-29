import { fetchNoteById } from '../../../../lib/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NoteDetailsClient from '../../[id]/NoteDetails.client';
import type { Metadata } from 'next';

// 1. Інтерфейс для пропсів сторінки
interface NoteDetailsProps {
    params: {
        id: string;
    };
}

// 2. Асинхронна функція для генерації метаданих
export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const note = await fetchNoteById(params.id);
  const title = note.title;
  const description = note.content.substring(0, 100) + '...';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-snowy-kappa.vercel.app/notes/${params.id}`,
      images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
    },
  };
}

// 3. Асинхронний компонент сторінки
export default async function NoteDetails({ params }: NoteDetailsProps) {
    const { id } = params;

    const queryClient = new QueryClient();

    // 4. Попереднє завантаження даних на сервері
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        // 5. Передача даних клієнтському компоненту
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={id} />
        </HydrationBoundary>
    );
}