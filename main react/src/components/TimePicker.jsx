import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export function TimePicker({valueHour, valueMinute, handleChange}) {
    const hours_array= ["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    const minutes_array= ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
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