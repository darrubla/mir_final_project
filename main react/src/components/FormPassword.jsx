import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';

export function FormPassword ({fieldName}) {
    return (
        <>
            <Form.Group className="d-flex flex-column my-1 mx-3" controlId="logInFormPass">
                <Form.Label className='fs-6 fw-lighter'>{fieldName}</Form.Label>
                <InputGroup className="mb-3 m-0 p-2 field-form">
                    <Form.Control
                        placeholder={fieldName.toLowerCase()}
                        aria-label={fieldName.toLowerCase()}
                        type="password"
                        className="rounded-5"
                    />
                </InputGroup>
            </Form.Group>
        </>
    );
    
}

FormPassword.propTypes = {
    fieldName: PropTypes.array.isRequired,
}
