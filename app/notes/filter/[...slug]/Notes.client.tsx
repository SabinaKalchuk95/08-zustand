'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import css from './Notes.module.css';
import { useState } from 'react';
import NotesList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import { useDebounce } from 'use-debounce'; // Додано для пошуку з затримкою

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const itemsPerPage = 12;
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: notes, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', { search: debouncedSearch, page: currentPage, perPage: itemsPerPage, tag }],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page: currentPage,
        perPage: itemsPerPage,
        tag: tag === 'All' ? undefined : tag,
      }),
  });


  const handleInputChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Використовуємо правильні властивості з FetchNotesResponse
  const notesToDisplay = notes?.notes || [];
  const totalPages = notes?.totalPages || 0;

  return (
    <>
      <Toaster />
      <header className={css.toolbar}>
        <div className={css.search}>
          <SearchBox value={search} onSearch={handleInputChange} />
        </div>
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}
      {isSuccess &&
        (notesToDisplay.length > 0 ? (
          <NotesList notes={notesToDisplay} />
        ) : (
          <p>No notes found.</p>
        ))}
      {totalPages > 1 && (
        <Pagination
          totalNumberOfPages={totalPages} // Змінено pageCount на totalNumberOfPages
          currentActivePage={currentPage} // Додано, оскільки Pagination.tsx очікує цей пропс
          setPage={setCurrentPage} // Змінено onPageChange на setPage
        />
      )}
    </>
  );
}