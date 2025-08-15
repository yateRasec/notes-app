import "./Modal.css"
import Button from "../Button/Button";

type ModalProps = {
    children?: React.ReactNode;
    title: string
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ children, title, isOpen, onClose, }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <Button className="close-button" onClick={onClose}>×</Button>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

