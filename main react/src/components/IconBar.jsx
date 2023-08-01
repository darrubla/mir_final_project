import PropTypes from 'prop-types';

export function IconBar({className}) {
    return (
        <>
            <i className={className}/>
        </>
    )
}

IconBar.propTypes = {
    className: PropTypes.string,
};