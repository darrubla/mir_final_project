import { css, cx } from '@emotion/css';
import { CustomInput, FormGroup, Input, Label } from './Input';
import { Alert, Button, Form } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { signInStudent } from '../../api/students';
import { signInTeacher } from '../../api/teachers';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../containers/AuthContext';
import UserContext from '../../containers/UserContext';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
});

export function SignInApp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { accountType, setAccountType } = useContext(AuthContext);
  const [error, setError] = useState('');

  const initialValues = {
    email: '',
    password: '',
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
        Sign in
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const signIn = {
              teacher: signInTeacher,
              student: signInStudent,
            }[accountType];

            const { data } = await signIn(values);

            setUser({
              ...data,
              type: accountType,
            });

            setSubmitting(false);

            navigate('/');
          } catch (error) {
            setError(error);
          }
        }}
        validationSchema={toFormikValidationSchema(signInSchema)}
      >
        {({
          values,
          errors,
          handleChange,
          touched,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div
              className={cx(
                css`
                  min-height: 496px;
                `,
                'd-flex flex-column justify-content-between',
              )}
            >
              <div>
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

                {error && (
                  <Alert
                    className={cx(
                      css`
                        font-size: 14px;
                        background: none;
                        border-color: var(--bs-form-invalid-border-color);
                        margin-top: 12px;
                      `,
                      'rounded-1 fw-normal p-2',
                    )}
                    variant="danger"
                  >
                    {error}
                  </Alert>
                )}

                <p
                  className={css`
                    color: #00e022;
                    font-family: Outfit;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    margin-left: 7px;
                    cursor: pointer;
                  `}
                >
                  Forgot Password?
                </p>
              </div>
              <div className="d-flex flex-column">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="nexus-dark"
                  className={cx(
                    css`
                      margin: 24px 0;
                      padding: 14px 0;
                      font-weight: 600;
                    `,
                    'rounded-pill',
                  )}
                >
                  Log in
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
                  Don{"'"}t have and account?{' '}
                  <Link
                    to={'/auth/register'}
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
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
