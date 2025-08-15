type TextareaProps = {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    item_id?: string | number;
    value?: string | number;
}

export default function Textarea({ id, label, name, placeholder, item_id, value }: TextareaProps) {
    return (
        <div key={id}>
            <label htmlFor={id}>{label}:</label>
            <textarea
                id={id}
                name={name}
                defaultValue={value}
                placeholder={`Enter ${placeholder.toLowerCase()}`}
                data-id={item_id}
            />
        </div>
    )
}