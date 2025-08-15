type InputProps = {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    item_id?: string | number;
    value?: string | number;
}

export default function Input({ id, label, name, placeholder, item_id, value }: InputProps) {
    return (
        <div key={id}>
            <label htmlFor={id}>{label}:</label>
            <input
                type="text"
                id={id}
                name={name}
                defaultValue={value}
                placeholder={`Enter ${placeholder.toLowerCase()}`}
                data-id={item_id}
            />
        </div>
    )
}