import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types'
import InputGroup from 'react-bootstrap/InputGroup';

export function FormFile({fieldName, setFieldValue}) {
  return (
    <Form.Group className="d-flex flex-column my-1 mx-3">
      <Form.Label className='fs-6 fw-lighter'>PROFILE PHOTO</Form.Label>
      <InputGroup className="mb-2 m-0 p-2 field-form">
        <Form.Control
          type="file"
          className={`rounded-5`}
          name={fieldName}
          onChange={(e) => {
            const file = e.target.files[0];
            setFieldValue('profilePhoto', file);
          }}
        />
      </InputGroup>
      
    </Form.Group>
  )
}

FormFile.propTypes = {
  fieldName: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}
