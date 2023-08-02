import Form from 'react-bootstrap/Form';
import {useState } from 'react';
import PropTypes from 'prop-types';

export function FormRange({val, handleChange}) {
    /*const [num, setNum] = useState(18);*/
    return (
        <>
        <Form.Group className="d-flex flex-column my-1 mx-3" >
            <Form.Label className='fs-6 fw-lighter'>AGE: {val}</Form.Label>
            <Form.Range name="age" className="mb-2 m-0 p-2 field-form" min="18" value={val} max="90" step="1" onChange={handleChange}/>
        </Form.Group>
        </>
    )
}
FormRange.propTypes = {
    val: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
}