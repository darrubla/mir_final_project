import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

export function FormText ({fieldName, handleChange, handleBlur, val, classN}) {
    return (
        <Form.Group className="d-flex flex-column my-1 mx-3" >
            <Form.Label className='fs-6 fw-lighter'>{fieldName}</Form.Label>
            <InputGroup className="mb-2 m-0 p-2 field-form">
                <Form.Control
                    placeholder={fieldName.toLowerCase()}
                    aria-label={fieldName.toLowerCase()}
                    type="text"
                    className={`rounded-5 ${classN}`}
                    name={fieldName.toLowerCase().replace(/ /g, '')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={val}
                />
                <ErrorMessage
                    name={fieldName.toLowerCase().replace(/ /g, '')}
                    component="div"
                    className="invalid-feedback"
                />
            </InputGroup>
        </Form.Group>
    );
}

FormText.propTypes = {
    fieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    classN: PropTypes.string.isRequired,
    val: PropTypes.string.isRequired,
}
