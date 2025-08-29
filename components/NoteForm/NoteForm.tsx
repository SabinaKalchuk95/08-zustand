'use client';

import css from "./NoteForm.module.css";
import { useId } from "react";
import { createNote, type NewNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { useNoteDraftStore } from "../../lib/store/noteStore";

export default function NoteForm() {
    const fieldId = useId();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const formState = draft;

    const { mutate, isPending } = useMutation({
        mutationFn: (newNote: NewNote) => createNote(newNote),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note created successfully!");
            clearDraft();
            router.back();
        },
        onError: (error) => {
            toast.error("Failed to create note: " + error.message);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDraft({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(formState);
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    id={`${fieldId}-title`}
                    type="text"
                    name="title"
                    className={css.input}
                    value={formState.title}
                    onChange={handleInputChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    name="content"
                    rows={8}
                    id={`${fieldId}-content`}
                    className={css.textarea}
                    value={formState.content}
                    onChange={handleInputChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select
                    name="tag"
                    id={`${fieldId}-tag`}
                    className={css.select}
                    value={formState.tag}
                    onChange={handleInputChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>

                <button type="submit" className={css.submitButton} disabled={isPending}>
                    {isPending ? "Creating..." : "Create note"}
                </button>
            </div>
        </form>
    );
}