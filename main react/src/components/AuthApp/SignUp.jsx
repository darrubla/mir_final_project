import { css, cx } from '@emotion/css';
import { Alert, Button, Form } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

import { CustomAreaInput, CustomInput, FormGroup, Label } from './Input';
import { useContext, useState } from 'react';
import AuthContext from '../../containers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { signUpTeacher } from '../../api/teachers';
import { signUpStudent } from '../../api/students';

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  lastname: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  bio: z.string().min(10, { message: 'Must provide a longer biography'}),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  age: z.coerce
    .number({ invalid_type_error: 'Invalid age' })
    .gte(18, 'Must be 18 and above'),
});

export function SignUpApp() {
  const navigate = useNavigate();
  const { accountType, setAccountType } = useContext(AuthContext);
  const [errorSignUp, setErrorSignUp] = useState('');

  const initialValues = {
    name: '',
    lastname: '',
    bio: '',
    email: '',
    password: '',
    age: '',
  };

  return (
    <>
      <div
        className={css`
          color: white;
          font-size: 31px;
          font-style: normal;
          font-weight: 600;
        `}
      >
        {`Create your Account`}
      </div>
      <div
        className={cx(
          css`
            min-height: 496px;
          `,
          'd-flex flex-column justify-content-between',
        )}
      >
        {errorSignUp&& <Alert variant='danger'>{errorSignUp}</Alert>}
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              const formData = new FormData();
              for (const value in values) {
                formData.append(value, values[value]);
              }
              const signUp = {
                teacher: signUpTeacher,
                student: signUpStudent,
              }[accountType];

              try {
                const { data } = await signUp(formData);
                navigate('/auth/signed', {
                  state: {
                    email: data.email,
                  },
                });
              } catch (error) {
                console.log(error)
                setErrorSignUp(error)
              } 

              setSubmitting(false);

              
            }}
            validationSchema={toFormikValidationSchema(signUpSchema)}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup
                  className="pt-0"
                  validityClassName={
                    touched.name && errors.name ? 'is-invalid' : ''
                  }
                >
                  <Label htmlFor="name">Name</Label>
                  <CustomInput
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.name && errors.name ? 'is-invalid' : ''}
                  />
                </FormGroup>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback mt-n2"
                />

                <FormGroup
                  validityClassName={
                    touched.lastname && errors.lastname ? 'is-invalid' : ''
                  }
                >
                  <Label htmlFor="lastname">Last name</Label>
                  <CustomInput
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.lastname && errors.lastname ? 'is-invalid' : ''
                    }
                  />
                </FormGroup>
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="invalid-feedback mt-n2"
                />

                <FormGroup
                  validityClassName={
                    touched.bio && errors.bio ? 'is-invalid' : ''
                  }
                >
                  <Label htmlFor="bio">Biography</Label>
                  <CustomAreaInput
                    type="text"
                    name="bio"
                    id="bio"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.bio && errors.bio ? 'is-invalid' : ''
                    }
                  />
                </FormGroup>
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="invalid-feedback mt-n2"
                />

                <FormGroup
                  validityClassName={
                    touched.email && errors.email ? 'is-invalid' : ''
                  }
                >
                  <Label htmlFor="email">Email</Label>
                  <CustomInput
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.email && errors.email ? 'is-invalid' : ''
                    }
                  />
                </FormGroup>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback mt-n2"
                />

                <FormGroup
                  validityClassName={
                    touched.password && errors.password ? 'is-invalid' : ''
                  }
                >
                  <Label htmlFor="password">Password</Label>
                  <CustomInput
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.password && errors.password ? 'is-invalid' : ''
                    }
                  />
                </FormGroup>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback mt-n2"
                />

                <div className="d-flex justify-content-between w-100 gap-3">
                  <div className="w-25">
                    <FormGroup
                      validityClassName={
                        touched.age && errors.age ? 'is-invalid' : ''
                      }
                    >
                      <Label htmlFor="age">Age</Label>

                      <select
                        id="age"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cx(
                          css`
                            font-size: 14px;
                            color: #d0d0d0;
                            border: none;

                            margin-top: 3px;
                          `,
                          'bg-nexus-altbase',
                        )}
                      >
                        {Array.from(Array(100)).map((_, idx) => (
                          <option key={idx} value={idx}>
                            {idx}
                          </option>
                        ))}
                        <option value={''}>-</option>
                      </select>
                    </FormGroup>
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="invalid-feedback mt-n2"
                    />
                  </div>
                  <FormGroup className="w-75">
                    <Label htmlFor="profilePhoto">Profile photo</Label>
                    <div
                      className={cx(
                        css`
                          font-size: 14px;
                          font-weight: 300;
                          color: #d0d0d0;
                        `,
                        'd-flex justify-content-between align-items-end',
                      )}
                    >
                      <span
                        className={cx(
                          css`
                            white-space: nowrap;
                            max-width: 16ch;
                            overflow: hidden;
                            text-overflow: ellipsis;
                          `,
                          `fw-normal ${
                            values.profilePhoto && 'text-nexus-accent'
                          }`,
                        )}
                      >
                        {values.profilePhoto
                          ? `• ${values.profilePhoto.name}`
                          : '• No file chosen'}
                      </span>
                      <label
                        htmlFor="profilePhoto"
                        className={cx(
                          css`
                            border-radius: 4px;
                            border: 1px solid #d0d0d0;
                            cursor: pointer;
                            &:hover {
                              background: white;
                              color: black;
                            }
                          `,
                          'px-3',
                        )}
                      >
                        Upload File
                        <i className="bi bi-upload ms-2"></i>
                      </label>
                    </div>

                    <input
                      id="profilePhoto"
                      name="profilePhoto"
                      type="file"
                      className={css`
                        display: none;
                      `}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue('profilePhoto', file);
                      }}
                    />

                    <ErrorMessage name="profilePhoto" component="div" />
                  </FormGroup>
                </div>

                <div className="d-flex flex-column">
                  <Button
                    variant="nexus-dark"
                    className={cx(
                      css`
                        margin: 24px 0;
                        padding: 14px 0;
                        font-weight: 600;
                      `,
                      'rounded-pill',
                    )}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                  <p
                    className={css`
                      color: #fff;
                      font-family: Outfit;
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: normal;
                    `}
                  >
                    Already have an account?{' '}
                    <Link
                      to={'/auth/login'}
                      className={css`
                        color: #00e022;
                        font-family: Outfit;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        text-decoration: none;
                      `}
                      onClick={() => setAccountType('')}
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
