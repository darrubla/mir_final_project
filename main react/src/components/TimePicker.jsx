import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { hours_array, minutes_array } from '../text/constants';

export function TimePicker({valueHour, valueMinute, handleChange}) {

    return (
        <>
            <div className='d-flex flex-row'>
                <Form.Select
                    onChange={handleChange}
                    value={valueHour}
                    className={`rounded-5 d-flex`}
                    name={'hour'}
                >
                    {hours_array.map((hour_array, key)=>(
                        <option value={hour_array} key={key}>{hour_array}</option>
                    ))}
                </Form.Select>
                <Form.Select
                    onChange={handleChange}
                    value={valueMinute}
                    className={`rounded-5 d-flex`}
                    name={'minute'}
                >
                    {minutes_array.map((minute_array, key)=>(
                        <option value={minute_array} key={key}>{minute_array}</option>
                    ))}
                </Form.Select>
            </div>
            
        </>
    )
}

TimePicker.propTypes = {
    valueHour: PropTypes.string.isRequired,
    valueMinute: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
}