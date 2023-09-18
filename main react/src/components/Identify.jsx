import PropTypes from 'prop-types';

export function Identify({formTitle, children}) {
    return (
        <div className=' d-flex sign-in-form bg-body-secondary justify-content-center flex-column mt-0 pt-5 px-1'>
            <h3 className='text-center'>{formTitle}</h3>
            <div className='d-flex login-container px-3 mt-3 justify-content-center'>
                {children}
            </div>
        </div>
    );
}

Identify.propTypes = {
    formTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};