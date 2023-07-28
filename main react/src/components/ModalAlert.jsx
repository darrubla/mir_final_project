import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


export function ModalAlert({handleClose, show, onLog}) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select your account type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-grid gap-2">
                        <Button variant="warning" size="lg" onClick={() => onLog("teacher")}>
                            Continue as teacher
                        </Button>
                        <Button variant="warning" size="lg" onClick={() => onLog("student")}>
                            Continue as student
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
        
    )
}
ModalAlert.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onLog: PropTypes.func.isRequired,
};