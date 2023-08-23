import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

export function DateText ({fieldName, handleShowCalendar, handleChange, handleBlur, value, className}) {
    return (
        <>
            <Form.Group className="d-flex flex-column mt-2">
                <InputGroup className="field-form">
                    <Form.Control
                        placeholder={fieldName.toLowerCase()}
                        aria-label={fieldName.toLowerCase()}
                        type="text"
                        className={`rounded-5 ${className}`}
                        name={fieldName.toLowerCase().replace(/ /g, '')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                        onClick={handleShowCalendar}
                        readOnly
                    />
                    <ErrorMessage
                        name={fieldName.toLowerCase().replace(/ /g, '')}
                        component="div"
                        className="invalid-feedback"
                    />
                </InputGroup>
            </Form.Group>
        </>
    );
    
}

DateText.propTypes = {
    fieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleShowCalendar: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}
