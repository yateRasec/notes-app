import { useState, useId, useEffect } from "react"
import Button from "./components/Button/Button"
import Note from "./components/Note/Note"
import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import type { noteType } from "./types/noteType";
import "./App.css"
import useApiNotes from "./hooks/modal_result";
import NoteServices from "./services/note.services";



function App() {
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [allNotes, setAllNotes] = useState<noteType[]>([])
  const [selectedNote, setSelectedNote] = useState<noteType | null>(null);


  const titleId = useId();
  const descriptionId = useId();
  const searchId = useId();


  const {
    modalResult,
    modalResultMessage,
    handleDeleteNote,
    handleSaveNote,
    handleCloseModalResult
  } = useApiNotes({ titleId, descriptionId, setModalFormOpen });

  // TODO: implement the logic to fetch all notes from the service
  useEffect(() => {
    const noteService = new NoteServices();
    noteService.getAllNotes().then(notes => {
      setAllNotes(notes)
    });
  }, [modalResult])

  console.log("modalResult", modalResult)

  const fields = [
    { id: titleId, type: "text", name: "title", label: "Title", placeholder: "note title" },
    { id: descriptionId, type: "textarea", name: "description", label: "Description", placeholder: "note description" }
  ]

  const fieldsSearch = [
    { id: searchId, type: "text", name: "seach", label: "Seach", placeholder: "Any text" },
  ]

  const handleEditNote = (id: number) => {
    console.log("Edit note clicked", id);
    setSelectedNote(allNotes.find(note => note.id === id) || null);
    setModalFormOpen(true);
  }

  const handleOpenModal = () => {
    setSelectedNote(null)
    setModalFormOpen(true);
  };

  const handleCloseModal = () => {
    setModalFormOpen(false);
  };

  const handleSearchByText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget; // HTMLFormElement
    const text = (form.elements.namedItem(searchId) as HTMLInputElement).value;
    const noteService = new NoteServices();
    noteService.serachByText({ text }).then(notes => {
      setAllNotes(notes)
    });
  }


  return (
    <>

      <h1>Notes</h1>
      <p>Click the button to add a new note</p>

      <header className="header">
        <section>

          <Form handleSubmitForm={handleSearchByText} principalText="Search" fields={fieldsSearch} data={selectedNote} />
        </section>
      </header>

      <nav>

        <Button title="Add Note" onClick={handleOpenModal}></Button>
      </nav>

      <main className="app">
        {
          allNotes.map(note => (
            <Note key={note.id} onClickEdit={handleEditNote} onClickDelete={handleDeleteNote} {...note} />
          ))
        }
      </main>
      <Modal title="Add new note" isOpen={modalFormOpen} onClose={handleCloseModal}>
        <Form handleSubmitForm={handleSaveNote} handleCancelForm={handleCloseModal} fields={fields} data={selectedNote} />
      </Modal >

      <Modal title={modalResultMessage} isOpen={modalResult} onClose={handleCloseModalResult} >
        <Button title="Close" onClick={handleCloseModalResult}></Button>
      </Modal>
    </>
  )
}

export default App
