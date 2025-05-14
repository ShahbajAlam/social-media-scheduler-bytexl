import "../styles/Modal.css";

const Modal = ({ show, onClose, onConfirm, title, message }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="confirm-btn" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
