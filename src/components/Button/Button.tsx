type ButtonProps = {
    title?: string;
    className?: string;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function Button({ title, className, children, type, onClick }: ButtonProps) {
    const finalClass = className ? className : "button"
    return (
        <button className={finalClass} onClick={onClick} type={type}>
            {title ? title : children}
        </button>
    )
}