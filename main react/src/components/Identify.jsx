import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export function Identify({formTitle, elements}) {
    return (
        <div className=' d-flex sign-in-form bg-body-secondary justify-content-center flex-column mt-5 pt-5 px-1'>
            <h3 className='text-center'>{formTitle}</h3>
            <div className='d-flex login-container px-3 mt-3'>
                <Form className='d-flex flex-column'>
                    {elements}
                </Form>
            </div>
        </div>
    );
}

Identify.propTypes = {
    formTitle: PropTypes.array.isRequired,
    elements: PropTypes.array.isRequired,
};