import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.join(' / ') || 'All';
  const title = `Notes filtered by: ${filter}`;
  const description = `Сторінка з нотатками, відфільтрованими за: ${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand.vercel.app/notes/filter/${slug?.join('/')}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NotesFilterPage({ params }: PageProps) {
  const { slug } = await params;
  const filter = slug?.join(' / ') || 'All';
  return <div>Filter: {filter}</div>;
}
