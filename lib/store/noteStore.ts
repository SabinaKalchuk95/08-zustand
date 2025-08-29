import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { NoteTag } from '../api';

interface DraftState {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteDraftStore {
  draft: DraftState;
  setDraft: (note: DraftState) => void;
  clearDraft: () => void;
}

const initialDraft: DraftState = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);