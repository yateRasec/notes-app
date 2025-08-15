import Button from "../Button/Button";
import Input from "./Input/Input";
import Textarea from "./Textarea/Textarea";
import type { noteType } from "../../types/noteType";

type FormFieldProps = {
    id: string;
    label: string;
    name: keyof noteType;
    placeholder: string;
    type: "text" | "textarea";
}
type FormProps = {
    handleSaveForm: (event: React.FormEvent<HTMLFormElement>) => void;
    handleCancelForm: () => void;
    fields: FormFieldProps[];
    data: noteType | null;
}

export default function Form({ handleSaveForm, handleCancelForm, fields, data }: FormProps) {
    console.log(data)
    return (
        <form onSubmit={(e) => { handleSaveForm(e) }}>
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
            <Button title="Save" type="submit"></Button>
            <Button title="Cancel" onClick={handleCancelForm}></Button>
        </form>
    )
}