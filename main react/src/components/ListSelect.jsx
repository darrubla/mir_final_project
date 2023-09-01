import { ErrorMessage } from 'formik';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export function ListSelect({optionsList, fieldName, handleChange, handleBlur, value, className}) {
    return (
        <>
            <Form.Select 
                aria-label={fieldName.toLowerCase()}
                name={fieldName.toLowerCase().replace(/ /g, '')} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                value={value} 
                className={`rounded-5${className}`}>
                <option>{`--Select ${fieldName.toLowerCase()}--`}</option>
                {optionsList.map((optionList, key)=>(
                    <option value={optionList} key={key}>{optionList}</option>
                ))}
            </Form.Select>
            <ErrorMessage
                name={fieldName.toLowerCase().replace(/ /g, '')}
                component="div"
                className="invalid-feedback"
            />
        </>
    )
    
}

ListSelect.propTypes = {
    optionsList: PropTypes.array.isRequired,
    fieldName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}