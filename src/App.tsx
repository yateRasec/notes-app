import { useState, useId, useEffect } from "react"
import Button from "./components/Button/Button"
import Note from "./components/Note/Note"
import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import { MESSAGES } from "./constants/messages";
import type { noteType } from "./types/noteType";
import "./App.css"



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState(false);
  const [modalResultMessage, setModalResultMessage] = useState("");
  const [allNotes, setAllNotes] = useState<noteType[]>([])
  const [selectedNote, setSelectedNote] = useState<noteType | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  // TODO: implement the logic to fetch all notes from the service
  useEffect(() => {
    console.log("entra a consultar todas las notas")

    setAllNotes([
      { id: 1, title: "Note 1", description: "This is the first note." },
      { id: 2, title: "Note 2", description: "This is the second note." },
      { id: 3, title: "Note 3", description: "This is the third note." },
      { id: 4, title: "Note 4", description: "This is the fourth note." },
      { id: 5, title: "Note 5", description: "This is the fifth note." },
      { id: 6, title: "Note 6", description: "This is the sixth note." },
      { id: 7, title: "Note 7", description: "This is the seventh note." },
      { id: 8, title: "Note 8", description: "This is the eighth note." },
      { id: 9, title: "Note 9", description: "This is the ninth note." },
      { id: 10, title: "Note 10", description: "This is the tenth note." }])
  }, [])

  const fields = [
    { id: titleId, type: "text", name: "title", label: "Title", placeholder: "note title" },
    { id: descriptionId, type: "textarea", name: "description", label: "Description", placeholder: "note description" }
  ]



  const handleOpenModal = () => {
    setSelectedNote(null)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const handleDeleteNote = (id: number) => {
    //TODO: implement Delete note functionality
    setModalResultMessage(MESSAGES.DELETE_NOTE);
    setModalResult(true);
    console.log("Deleted", id)
  };

  const handleEditNote = (id: number) => {
    console.log("Edit note clicked", id);
    setSelectedNote(allNotes.find(note => note.id === id) || null);
    setIsModalOpen(true);
  }


  const handleSaveNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget; // HTMLFormElement

    const id = (form.elements.namedItem(titleId) as HTMLInputElement).dataset.id;
    const title = (form.elements.namedItem(titleId) as HTMLInputElement).value;
    const description = (form.elements.namedItem(descriptionId) as HTMLInputElement).value;

    console.log("Note saved")
    console.log("id", id)
    console.log("title", title)
    console.log("description", description)
    if (id) {
      //TODO: implement update note functionality
      setModalResultMessage(MESSAGES.EDIT_NOTE);
      setModalResult(true);
      console.log("updated", id)
    } else {
      //TODO: implement save note functionality
      setModalResultMessage(MESSAGES.SAVE_NOTE);
      setModalResult(true);
      console.log("saved")
    }
    setIsModalOpen(false);
  }

  const handleCloseModalResult = () => {
    setModalResult(false)
  }

  return (
    <>

      <h1>Notes</h1>
      <p>Click the button to add a new note</p>
      <Button title="Add Note" onClick={handleOpenModal}></Button>

      <Modal title="Add new note" isOpen={isModalOpen} onClose={handleCloseModal}>
        <Form handleSaveForm={handleSaveNote} handleCancelForm={handleCloseModal} fields={fields} data={selectedNote} />
      </Modal >

      <section className="app">
        {
          allNotes.map(note => (
            <Note key={note.id} onClickEdit={handleEditNote} onClickDelete={handleDeleteNote} {...note} />
          ))
        }

      </section>
      <Modal title={modalResultMessage} isOpen={modalResult} onClose={handleCloseModalResult} >
        <Button title="Close" onClick={handleCloseModalResult}></Button>
      </Modal>
    </>
  )
}

export default App
