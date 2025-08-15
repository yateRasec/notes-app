import Button from "../Button/Button";
import Input from "./Input/Input";
import Textarea from "./Textarea/Textarea";
import type { noteType } from "../../types/noteType";
import "./Form.css"

type FormFieldProps = {
    id: string;
    label: string;
    name: keyof noteType;
    placeholder: string;
    type: "text" | "textarea";
}
type FormProps = {
    handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelForm?: () => void;
    principalText?: string;
    fields: FormFieldProps[];
    data: noteType | null;
}

export default function Form({ handleSubmitForm, handleCancelForm, principalText, fields, data }: FormProps) {
    return (
        <form className="form" onSubmit={(e) => { handleSubmitForm(e) }}>
            {
                fields.map(field => {
                    const value = data ? data[field.name] : "";
                    const item_id = data ? data["id"] : "";

                    if (field.type === "textarea") {
                        return (
                            <Textarea
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                name={field.name}
                                placeholder={field.placeholder}
                                item_id={item_id}
                                value={value}
                            />
                        )
                    }
                    return (
                        <Input
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            name={field.name}
                            placeholder={field.placeholder}
                            item_id={item_id}
                            value={value}
                        />
                    )
                })
            }
            <footer>
                <Button title={principalText ? principalText : "Save"} type="submit"></Button>
                {handleCancelForm && <Button title="Cancel" onClick={handleCancelForm}></Button>}

            </footer>
        </form>
    )
}