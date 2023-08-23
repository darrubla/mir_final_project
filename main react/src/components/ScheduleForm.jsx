import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ListSelect } from './ListSelect';
import { FormDescription } from './FormDescription';
import { NavSeparator } from './NavSeparator';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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
})
export function ScheduleForm() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const initialValues = {
        subject: '',
        topicdescription: '',
        location: '',
        locationdescription: '',
      }
    return (
        <>
            <Formik 
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    navigate(`/`);
                }}
                validationSchema={toFormikValidationSchema(scheduleSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
                    <div className="form-schedule-container bg-body-secondary justify-content-center m-2 p-5">
                        <Form className='d-flex flex-row' onSubmit={handleSubmit}>
                            <div className='d-flex flex-column justify-content-start'>
                                <ListSelect optionsList={subjects} fieldName='SUBJECT' handleChange={handleChange} handleBlur={handleBlur} value={values.subject} className={touched.subject && errors.subject ? ' is-invalid' : ''} />
                                <FormDescription fieldName="topic description" handleChange={handleChange} handleBlur={handleBlur} val={values.topicdescription} classN={touched.topicdescription && errors.topicdescription ? 'is-invalid' : ''}/>
                            </div>
                            <div className='d-flex flex-column justify-content-start'>
                                <NavSeparator />
                            </div>
                            <div className='d-flex flex-column justify-content-start'>
                                <ListSelect optionsList={locations} fieldName='LOCATION' handleChange={handleChange} handleBlur={handleBlur} value={values.location} className={touched.location && errors.location ? ' is-invalid' : ''} />
                                <FormDescription fieldName="location description" handleChange={handleChange} handleBlur={handleBlur} val={values.locationdescription} classN={touched.locationdescription && errors.locationdescription ? 'is-invalid' : ''}/>
                                <Calendar
                                    onDayPress={day => {
                                        setSelectedDate(day.dateString);
                                    }}
                                    markedDates={{
                                    [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                                    }}
                                />
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