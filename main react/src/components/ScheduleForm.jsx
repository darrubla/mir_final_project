import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { ListSelect } from './ListSelect';
import { FormDescription } from './FormDescription';
import { NavSeparator } from './NavSeparator';
import { useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DateText } from './DateText';
import { TimePicker } from './TimePicker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useNavigate } from 'react-router-dom';
import { subjects, locations } from '../text/constants';
import PropTypes from 'prop-types';
import { useParams} from 'react-router-dom';
import { getSubjectId } from '../api/subjects';

const scheduleSchema = z
.object({
    subject: z.enum(subjects, {
        errorMap: () => ({ message: 'Please select a valid subject' })
    }),
    topicdescription: z.string().min(20, { message: "Provide a longer topic description" }),
    location: z.enum(locations, {
        errorMap: () => ({ message: 'Please select a valid location' })
    }),
    locationdescription: z.string().min(10, { message: "Provide a longer description" }),
    scheduledate: z.string(),
    scheduletime: z.string(),
})
export function ScheduleForm({ onCreate }) {
    const navigate = useNavigate();
    const [dateValue, onDateChange] = useState(new Date(new Date().setDate(new Date().getDate() +1)));
    const [dateSelected, setDateSelected] = useState(`${dateValue.getFullYear()}-${(dateValue.getMonth()+1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [hour, setHour] = useState("12");
    const [minute, setMinute] = useState("00");
    const [dataSubject, setDataSubject] = useState('');

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
    }
    const handleShowTime = () => {
        setShowTime(!showTime);
    }
    const handleCloseCalendar = () => {
        setShowCalendar(false);
    }

    const initialValues = {
        subject: '',
        topicdescription: '',
        location: '',
        locationdescription: '',
        scheduledate: dateSelected,
        scheduletime: `${hour}:${minute}:00`,
        scheduledatetime: (new Date(`${dateSelected}T${hour}:${minute}:00`))
    }
    async function loadSubject({ subjectname }) {
        try {
            console.log(subjectname)
            const response = await getSubjectId({ subjectname });
            setDataSubject(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                const lessonContent={}
                lessonContent.site=values.location
                lessonContent.description=values.topicdescription
                lessonContent.scheduledAt=values.scheduledatetime
                lessonContent.subjectId=dataSubject
                onCreate({
                    lessonContent,
                });
                navigate('/')
                setSubmitting(false);
            }}
            validationSchema={toFormikValidationSchema(scheduleSchema)}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
                <div className="form-schedule-container bg-body-secondary justify-content-center m-2 p-5">
                    <Form className='d-flex flex-row' onSubmit={handleSubmit}>
                        <div className='d-flex flex-column justify-content-start'>
                            <div className='list-container' onClick={() => {
                                const subjectname=values.subject
                                console.log(subjectname)
                                if (subjectname) {
                                    loadSubject({subjectname})
                                }
                            }}>
                                <ListSelect optionsList={subjects} fieldName='SUBJECT' handleChange={handleChange} handleBlur={handleBlur} value={values.subject} className={touched.subject && errors.subject ? ' is-invalid' : ''} />
                            </div>
                            <FormDescription fieldName="topic description" handleChange={handleChange} handleBlur={handleBlur} val={values.topicdescription} classN={touched.topicdescription && errors.topicdescription ? 'is-invalid' : ''}/>
                            <div>
                                <DateText fieldName='schedule date' handleShow={handleShowCalendar} handleChange={handleChange} handleBlur={handleBlur} value={values.scheduledate} className={touched.scheduledate && errors.scheduledate ? 'is-invalid' : ''}/>
                                {showCalendar && (
                                    <Calendar
                                        onHide={handleCloseCalendar}
                                        onChange={onDateChange} 
                                        value={dateSelected}
                                        onClickDay={
                                        (dateValue) => {
                                            handleShowCalendar()
                                            setDateSelected(`${dateValue.getFullYear()}-${(dateValue.getMonth()+1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`)
                                            values.scheduledate=`${dateValue.getFullYear()}-${(dateValue.getMonth()+1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
                                            values.scheduledatetime=(new Date(`${values.scheduledate}T${values.scheduletime}`))
                                        }}
                                        minDate={new Date(new Date().setDate(new Date().getDate() +1))}
                                    />
                                )}
                                
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-start'>
                            <NavSeparator />
                        </div>
                        <div className='d-flex flex-column justify-content-start'>
                            <ListSelect optionsList={locations} fieldName='LOCATION' handleChange={handleChange} handleBlur={handleBlur} value={values.location} className={touched.location && errors.location ? ' is-invalid' : ''} />
                            <FormDescription fieldName="location description" handleChange={handleChange} handleBlur={handleBlur} val={values.locationdescription} classN={touched.locationdescription && errors.locationdescription ? 'is-invalid' : ''}/>
                            <div>
                                <DateText fieldName='schedule time' handleShow={handleShowTime} handleChange={handleChange} handleBlur={handleBlur} value={`${values.scheduletime}`} className={touched.scheduletime && errors.scheduletime ? 'is-invalid' : ''}/>
                                {showTime && (
                                    <TimePicker 
                                        handleChange={(event) =>{
                                            if (event.target.name==="hour") {
                                                setHour(event.target.value)
                                                values.scheduletime=`${event.target.value}:${minute}:00`
                                                values.scheduledatetime=(new Date(`${values.scheduledate}T${values.scheduletime}`))
                                            }
                                            if (event.target.name==="minute") {
                                                setMinute(event.target.value)
                                                values.scheduletime=`${hour}:${event.target.value}:00`
                                                values.scheduledatetime=(new Date(`${values.scheduledate}T${values.scheduletime}`))
                                            }
                                        }} 
                                        valueHour={hour} 
                                        valueMinute={minute}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-start'>
                            <NavSeparator />
                        </div>
                        <div className='d-flex flex-column justify-content-start'>
                            <Button 
                                variant="success" 
                                className='rounded-5 d-flex btn-register mb-1 px-5 py-2 justify-content-center' 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                SCHEDULE
                            </Button>
                            <Button variant="danger" className='rounded-5 d-flex btn-register mb-1 px-5 py-2 justify-content-center' type="submit" disabled={isSubmitting}>CANCEL</Button>
                        </div>
                        
                    </Form>
                </div>
            )}
        </Formik>
    )
}

ScheduleForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
};