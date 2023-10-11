import Button from 'react-bootstrap/Button';
import { FormUsername } from '../components/FormUsername';
import { FormPassword } from '../components/FormPassword';
import { FormText } from '../components/FormText';
import { Identify } from '../components/Identify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { FormRange } from '../components/FormRange';
import { signUpStudent } from '../api/students';
import { signUpTeacher } from '../api/teachers';
import { Loading } from '../animation/Loading';
import { useState } from 'react';
import { FormFile } from '../components/FormFile';

const signUpSchema = z
    .object({
        name: z.string().min(2, { message: "Must be 2 or more characters long" }),
        lastname: z.string().min(2, { message: "Must be 2 or more characters long" }),
        age: z.number(),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Must be 8 or more characters long" }),
        confirmpassword: z.string(),
    })
    .refine((data) => data.confirmpassword === data.password, {
        path: ["confirmpassword"],
        message: "Passwords don't match"
      })


export function Signup() {
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const lastUrlPart = parts[parts.length - 1];
    const navigate = useNavigate();
    const [loadSignUp, setLoadSignUp] = useState(false)
    const [errorSignUp, setErrorSignUp] = useState('')
    let type = "";
    if (lastUrlPart==="student" || lastUrlPart==="teacher") {
        type = lastUrlPart;
    }
    else {
        navigate("/notFound");
    }

    const initialValues = {
        name: '',
        lastname: '',
        age: 18,
        email: '',
        password: '',
        confirmpassword: '',
      }
    return (
        <>
            <Formik 
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                    setErrorSignUp('');
                    if (type === "student") {
                        setLoadSignUp(true);
                        setErrorSignUp('');
                        try {
                            const { data } = await signUpStudent(values)
                            setSubmitting(false);
                            navigate(`/signin/${type}`);
                        } catch (error) {
                            setErrorSignUp(error)
                        } finally {
                            setLoadSignUp(false)
                        }
                        
                    }
                    if (type === "teacher") {
                        setLoadSignUp(true);
                        setErrorSignUp('');
                        try {
                            const formData = new FormData();
                            for (const value in values) {
                                formData.append(value, values[value]);
                            }

                            const { data } = await signUpTeacher(formData);
                            // const { data } = await signUpTeacher(values)
                            setSubmitting(false);
                            navigate(`/signin/${type}`);
                        } catch (error) {
                            setErrorSignUp(error)
                        } finally {
                            setLoadSignUp(false)
                        }
                    }
                }}
                validationSchema={toFormikValidationSchema(signUpSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue,}) => (
                    <>
                        <Identify formTitle={`${type.toUpperCase()} SIGN UP`}>
                            <Form className='d-flex flex-column' onSubmit={handleSubmit}>
                                <FormText fieldName="NAME" handleChange={handleChange} handleBlur={handleBlur} val={values.name} classN={touched.name && errors.name ? 'is-invalid' : ''}/>
                                <FormText fieldName="LAST NAME" handleChange={handleChange} handleBlur={handleBlur} val={values.lastname} classN={touched.lastname && errors.lastname ? 'is-invalid' : ''}/>
                                <FormFile fieldName="profilePhoto" setFieldValue={setFieldValue} />
                                <FormRange val={values.age} handleChange={handleChange}/>
                                <FormUsername fieldName="EMAIL" symbol="@" handleChange={handleChange} handleBlur={handleBlur} val={values.email} classN={touched.email && errors.email ? 'is-invalid' : ''}/>
                                <FormPassword fieldName="PASSWORD" handleChange={handleChange} handleBlur={handleBlur} val={values.password} classN={touched.password && errors.password ? 'is-invalid' : ''}/>
                                <FormPassword fieldName="CONFIRM PASSWORD" handleChange={handleChange} handleBlur={handleBlur} val={values.confirmpassword} classN={touched.confirmpassword && errors.confirmpassword ? 'is-invalid' : ''}/>
                                <div className='signup-error-and-load d-flex justify-content-center'>
                                    {loadSignUp && <Loading />}
                                    {errorSignUp && <Alert variant='danger'>{errorSignUp}</Alert>}
                                </div>
                                <Button variant="warning" className='d-flex btn-register m-3 px-4 py-3 justify-content-center' type="submit" disabled={isSubmitting}>SIGN UP</Button>
                                <Button variant="info" className='d-flex btn-signin m-3 px-0 py-3 justify-content-evenly'>
                                    <div className='d-flex'><i className="bi bi-google" /></div>
                                    <div className='d-flex'>CONTINUE WITH GOOGLE</div>
                                </Button>
                            </Form>
                        </Identify>
                    </>
                )}
            </Formik>
        </>
    )
}
