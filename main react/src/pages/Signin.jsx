import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { FormUsername } from '../components/FormUsername';
import { FormPassword } from '../components/FormPassword';
import { Identify } from '../components/Identify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import UserContext from '../containers/UserContext';
import { useNavigate } from 'react-router-dom';


const signInSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Must be 8 or more characters long" }),
    })

export function Signin() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const type = user === undefined ? JSON.parse(localStorage.getItem('user')).type : JSON.parse(JSON.stringify(user)).type;
    const initialValues = {
        email: '',
        password: '',
      }
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    setUser({ type: type, email: values.email});
                    setSubmitting(false);
                    navigate(`/home_${type.toLowerCase()}`);
                }}
                validationSchema={toFormikValidationSchema(signInSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
                    <Identify formTitle={`${type.toUpperCase()} LOG IN`}>
                        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
                            <FormUsername fieldName="EMAIL" symbol="@" handleChange={handleChange} handleBlur={handleBlur} val={values.email} classN={touched.email && errors.email ? 'is-invalid' : ''}/>
                            <FormPassword fieldName="PASSWORD" handleChange={handleChange} handleBlur={handleBlur} val={values.password} classN={touched.password && errors.password ? 'is-invalid' : ''}/>
                            <Button variant="warning" className='d-flex btn-register m-3 px-4 py-3 justify-content-center' type="submit" disabled={isSubmitting}>SIGN IN</Button>
                            <Button variant="info" className='d-flex btn-signin m-3 px-0 py-3 justify-content-evenly'>
                                <div className='d-flex'> <i className="bi bi-google" /></div>
                                <div className='d-flex'>CONTINUE WITH GOOGLE</div>
                            </Button>
                        </Form>
                    </Identify>
                )}
            </Formik>
        </>
    );
}