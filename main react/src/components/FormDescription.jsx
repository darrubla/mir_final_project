import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

export function FormDescription({
  fieldName,
  handleChange,
  handleBlur,
  val,
  classN,
}) {
  return (
    <Form.Group className="d-flex flex-column">
      <InputGroup className="field-form">
        <Form.Control
          placeholder={fieldName.toLowerCase()}
          aria-label={fieldName.toLowerCase()}
          type="text"
          className={`py-2 rounded-3 ${classN}`}
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

FormDescription.propTypes = {
  fieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  classN: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
};
