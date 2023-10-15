import Button from 'react-bootstrap/Button';
import { useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { ListSelect } from './ListSelect';
import { NavSeparator } from './NavSeparator';
import { getSubjectId } from '../api/subjects';

import PropTypes from 'prop-types';


export function AddSubject({ onAdd, options }) {
    const scheduleSchema = z
        .object({
            subject: z.enum(options, {
                errorMap: () => ({ message: 'Please select a valid subject' })
            }),
    })
    const [dataSubject, setDataSubject] = useState('');
    const initialValues = {
        subject: '',
    }
    async function loadSubject({ subjectname }) {
        try {
            const response = await getSubjectId({ subjectname });
            setDataSubject(response.data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const payload={}
                payload.subjectId=dataSubject
                onAdd(payload);
                resetForm({
                    subject: '',
                })
                setSubmitting(false);
            }}
            validationSchema={toFormikValidationSchema(scheduleSchema)}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, handleReset}) => (
                <div className="form-schedule-container bg-body-secondary justify-content-center m-2 p-5">
                    <Form className='d-flex flex-row justify-content-center' onSubmit={handleSubmit}>
                        <div className='d-flex flex-column justify-content-start'>
                            <div className='list-container' onClick={() => {
                                const subjectname=values.subject
                                if (subjectname) {
                                    loadSubject({subjectname})
                                }
                            }}>
                                <ListSelect optionsList={options} fieldName='SUBJECT' handleChange={handleChange} handleBlur={handleBlur} value={values.subject} className={touched.subject && errors.subject ? ' is-invalid' : ''} />
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
                                ADD SUBJECT
                            </Button>
                            <Button 
                                variant="danger" 
                                className='rounded-5 d-flex btn-register mb-1 px-5 py-2 justify-content-center' 
                                onClick={handleReset}>
                                CANCEL</Button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

AddSubject.propTypes = {
    onAdd: PropTypes.func.isRequired,
    options: PropTypes.array,
};
