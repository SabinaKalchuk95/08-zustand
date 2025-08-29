import { fetchNoteById } from "../../../lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from 'next';

// Змінюємо тип params, щоб він був Promise
type NoteDetailsProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params; // Використовуємо await
    const note = await fetchNoteById(id);
    const title = note.title;
    const description = note.content.substring(0, 100) + '...';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://08-zustand-snowy-kappa.vercel.app/notes/${id}`,
            images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
    };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const { id } = await params; // Використовуємо await

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={id} />
        </HydrationBoundary>
    );
}