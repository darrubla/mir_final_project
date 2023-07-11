import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';

export function FormUsername ({fieldName}) {
    return (
        <>
            <Form.Group className="d-flex flex-column my-1 mx-3" controlId="logInFormUser">
                <Form.Label className='fs-6 fw-lighter'>{fieldName}</Form.Label>
                <InputGroup className="mb-3 m-0 p-2 field-form">
                    <InputGroup.Text className="rounded-start-pill" id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder={fieldName.toLowerCase()}
                        aria-label={fieldName.toLowerCase()}
                        type="text"
                        className="rounded-end-5"
                    />
                </InputGroup>
            </Form.Group>
        </>
    );
}

FormUsername.propTypes = {
    fieldName: PropTypes.array.isRequired,
}