import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { FormUsername } from '../components/FormUsername';
import { FormPassword } from '../components/FormPassword';
import { FormText } from '../components/FormText';
import { Identify } from '../components/Identify';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import UserContext from '../containers/UserContext';
import { useNavigate } from 'react-router-dom';
import { FormRange } from '../components/FormRange';

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
    let type = "";
    if (lastUrlPart==="student" || lastUrlPart==="teacher") {
        type = lastUrlPart;
    }
    else {
        navigate("/notFound");
    }
    const { setUser } = useContext(UserContext);
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
                onSubmit={(values, { setSubmitting }) => {
                    console.log(JSON.stringify(values, null, 2));
                    setUser({ 
                        type: type, 
                        email: values.email, 
                        name: values.name, 
                        lastname: values.lastname,
                        password: values.password,
                    });
                    setSubmitting(false);
                    navigate(`/`);
                }}
                validationSchema={toFormikValidationSchema(signUpSchema)}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
                    <Identify formTitle={`${type.toUpperCase()} SIGN UP`}>
                        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
                            <FormText fieldName="NAME" handleChange={handleChange} handleBlur={handleBlur} val={values.name} classN={touched.name && errors.name ? 'is-invalid' : ''}/>
                            <FormText fieldName="LAST NAME" handleChange={handleChange} handleBlur={handleBlur} val={values.lastname} classN={touched.lastname && errors.lastname ? 'is-invalid' : ''}/>
                            <FormRange val={values.age} handleChange={handleChange}/>
                            <FormUsername fieldName="EMAIL" symbol="@" handleChange={handleChange} handleBlur={handleBlur} val={values.email} classN={touched.email && errors.email ? 'is-invalid' : ''}/>
                            <FormPassword fieldName="PASSWORD" handleChange={handleChange} handleBlur={handleBlur} val={values.password} classN={touched.password && errors.password ? 'is-invalid' : ''}/>
                            <FormPassword fieldName="CONFIRM PASSWORD" handleChange={handleChange} handleBlur={handleBlur} val={values.confirmpassword} classN={touched.confirmpassword && errors.confirmpassword ? 'is-invalid' : ''}/>
                            <Button variant="warning" className='d-flex btn-register m-3 px-4 py-3 justify-content-center' type="submit" disabled={isSubmitting}>SIGN UP</Button>
                            <Button variant="info" className='d-flex btn-signin m-3 px-0 py-3 justify-content-evenly'>
                                <div className='d-flex'><i className="bi bi-google" /></div>
                                <div className='d-flex'>CONTINUE WITH GOOGLE</div>
                            </Button>
                        </Form>
                    </Identify>
                )}
            </Formik>
        </>
    )
}