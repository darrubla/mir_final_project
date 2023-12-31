import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

export function DateText({
  fieldName,
  handleShow,
  handleChange,
  handleBlur,
  value,
  className,
}) {
  return (
    <Form.Group className="d-flex flex-column">
      <InputGroup className="field-form">
        <Form.Control
          placeholder={fieldName.toLowerCase()}
          aria-label={fieldName.toLowerCase()}
          type="text"
          className={`py-2 rounded-3 ${className}`}
          name={fieldName.toLowerCase().replace(/ /g, '')}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          onClick={handleShow}
          readOnly
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

DateText.propTypes = {
  fieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
