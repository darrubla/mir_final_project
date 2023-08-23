import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { Button } from 'react-bootstrap';
import { ListSelect } from './ListSelect';
import { useNavigate } from 'react-router-dom';

const subjects = ["Math", "Science", "Spanish", "History", "English", "Art", "Music", "Physical Education", "Biology", "Chemistry", "Physics", "Geography", "Computer Science", "Economics", "Psychology", "Sociology", "Political Science", "Literature", "Philosophy", "Foreign Languages", "Health Education", "Environmental Science", "Civics", "Engineering", "Astronomy"];
const location = ["Teacher's site", "Students site", "Videocall"]

const scheduleSchema = z
    .object({
        subject: z.enum(subjects, {
            errorMap: () => ({ message: 'Please select a valid subject' })
        }),
        description: z.string().min(20, { message: "Provide a longer description" }),
    })


export function ScheduleForm() {
    const navigate = useNavigate();

    const initialValues = {
        subject: '',
        description: '',
      }
    return (
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
                    <div className="form-schedule-container d-flex bg-body-secondary justify-content-center flex-column m-2 p-5">
                        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
                            <ListSelect optionsList={subjects} fieldName='subject' handleChange={handleChange} handleBlur={handleBlur} value={values.subject} className={touched.subject && errors.subject ? ' is-invalid' : ''} />
                            <Button variant="warning" className='d-flex btn-register m-3 px-4 py-3 justify-content-center' type="submit" disabled={isSubmitting}>SCHEDULE</Button>
                        </Form>
                    </div>
                )}
            </Formik>
    )
}