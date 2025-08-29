import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import NotePreview from './NotePreview.client';
type NoteDetailsProps = {
    params: Promise<{ id: string }>;
};


export default async function NoteDetails({ params }: NoteDetailsProps)  {
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
