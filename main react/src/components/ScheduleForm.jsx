import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { ListSelect } from './ListSelect';
import { FormDescription } from './FormDescription';
import { NavSeparator } from './NavSeparator';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DateText } from './DateText';

const subjects = ["Math", "Science", "Spanish", "History", "English", "Art", "Music", "Physical Education", "Biology", "Chemistry", "Physics", "Geography", "Computer Science", "Economics", "Psychology", "Sociology", "Political Science", "Literature", "Philosophy", "Foreign Languages", "Health Education", "Environmental Science", "Civics", "Engineering", "Astronomy"];
const locations = ["Teacher's location", "Student's location", "Videocall"]

const scheduleSchema = z
.object({
    subject: z.enum(subjects, {
        errorMap: () => ({ message: 'Please select a valid subject' })
    }),
    topicdescription: z.string().min(20, { message: "Provide a longer topic description" }),
    location: z.enum(locations, {
        errorMap: () => ({ message: 'Please select a valid location' })
    }),
    locationdescription: z.string(),
    scheduledate: z.string()
})
export function ScheduleForm() {
    const [dateValue, onDateChange] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(`${dateValue.getFullYear()}-${dateValue.getMonth().toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
        console.log(showCalendar,'++')
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
    }

    return (
        <>
            <Formik 
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}
                validationSchema={toFormikValidationSchema(scheduleSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
                    <div className="form-schedule-container bg-body-secondary justify-content-center m-2 p-5">
                        <Form className='d-flex flex-row' onSubmit={handleSubmit}>
                            <div className='d-flex flex-column justify-content-start'>
                                <ListSelect optionsList={subjects} fieldName='SUBJECT' handleChange={handleChange} handleBlur={handleBlur} value={values.subject} className={touched.subject && errors.subject ? ' is-invalid' : ''} />
                                <FormDescription fieldName="topic description" handleChange={handleChange} handleBlur={handleBlur} val={values.topicdescription} classN={touched.topicdescription && errors.topicdescription ? 'is-invalid' : ''}/>
                                <div>
                                    <DateText fieldName='schedule date' handleShowCalendar={handleShowCalendar} handleChange={handleChange} handleBlur={handleBlur} value={values.scheduledate} className={touched.scheduledate && errors.scheduledate ? 'is-invalid' : ''}/>
                                    {showCalendar && (
                                        <Calendar
                                            onHide={handleCloseCalendar}
                                            onChange={onDateChange} 
                                            value={dateSelected}
                                            onClickDay={
                                            (dateValue) => {
                                                handleShowCalendar()
                                                setDateSelected(`${dateValue.getFullYear()}-${dateValue.getMonth().toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`)
                                                values.scheduledate=`${dateValue.getFullYear()}-${dateValue.getMonth().toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
                                            }}
                                            minDate={new Date()}
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
                                    
                                </div>
                            </div>
                            <div className='d-flex flex-column justify-content-start'>
                                <NavSeparator />
                            </div>
                            <div className='d-flex flex-column justify-content-start'>
                                <Button variant="warning" className='rounded-5 d-flex btn-register mb-1 px-5 py-2 justify-content-center' type="submit" disabled={isSubmitting}>SCHEDULE</Button>
                                <Button variant="danger" className='rounded-5 d-flex btn-register mb-1 px-5 py-2 justify-content-center' type="submit" disabled={isSubmitting}>CANCEL</Button>
                            </div>
                            
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}