import "./Note.css"
import Button from "../Button/Button";

type NoteProps = {
    id: number;
    title: string;
    description: string;
    onClickEdit: (id: number) => void;
    onClickDelete: (id: number) => void;
}
export default function Note({ id, title, description, onClickEdit, onClickDelete }: NoteProps) {

    return (
        <div className="note">
            <div>
                <Button className="close-button" onClick={() => onClickDelete(id)}>×</Button>
            </div>
            <main className="main-note">

                <h3>{title}</h3>
                <p>{description}</p>
                <footer>
                    <Button title="Edit" onClick={() => onClickEdit(id)}></Button>
                </footer>
            </main>
        </div>
    )
}