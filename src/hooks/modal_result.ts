import { useState } from "react";
import { MESSAGES } from "../constants/messages";
import NoteServices from "../services/note.services";

export default function useApiNotes({
    titleId,
    descriptionId,
    setModalFormOpen
}: { titleId: string, descriptionId: string, setModalFormOpen: (open: boolean) => void }) {

    const [modalResult, setModalResult] = useState(false);
    const [modalResultMessage, setModalResultMessage] = useState("");

    const noteService = new NoteServices();

    const handleDeleteNote = (id: number) => {
        noteService.deleteNote({ id }).then(response => {
            setModalResult(true);
            return response ? setModalResultMessage(MESSAGES.DELETE_NOTE) : setModalResultMessage(MESSAGES.ERROR)
        });
    };

    const handleSearchByText = ({ text }: { text: string }) => {
        noteService.serachByText({ text }).then(response => {
            setModalResult(true);
            return response ? setModalResultMessage(MESSAGES.SAVE_NOTE) : setModalResultMessage(MESSAGES.ERROR)
        });
    }

    const handleSaveNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget; // HTMLFormElement

        const id = Number((form.elements.namedItem(titleId) as HTMLInputElement).dataset.id);
        const title = (form.elements.namedItem(titleId) as HTMLInputElement).value;
        const description = (form.elements.namedItem(descriptionId) as HTMLInputElement).value;

        console.log("Note saved")
        console.log("id", id)
        console.log("title", title)
        console.log("description", description)
        setModalFormOpen(false);
        if (id) {
            noteService.updateNote({ id, title, description }).then(response => {
                setModalResult(true);
                return response ? setModalResultMessage(MESSAGES.EDIT_NOTE) : setModalResultMessage(MESSAGES.ERROR);
            });
        } else {
            noteService.saveNote({ title, description }).then(response => {
                console.log("response", response)
                setModalResult(true);
                return response ? setModalResultMessage(MESSAGES.SAVE_NOTE) : setModalResultMessage(MESSAGES.ERROR)
            });
        }
    }

    const handleCloseModalResult = () => {
        setModalResult(false)
    }

    return {
        modalResult,
        modalResultMessage,
        handleDeleteNote,
        handleSaveNote,
        handleCloseModalResult,
        handleSearchByText
    }
}