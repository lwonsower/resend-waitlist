import { MouseEventHandler } from 'react';
import './Modal.css';

const Modal = ({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean;
    onClose: MouseEventHandler;
    children: React.ReactElement;
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="Overlay">
            <div className="Content">
                <button className="Close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
