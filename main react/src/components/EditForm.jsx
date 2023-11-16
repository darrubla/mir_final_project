import { useContext } from 'react';
import { css, cx } from '@emotion/css';
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import PropTypes from 'prop-types';
import { CustomAreaInput, CustomInput, FormGroup, Label } from '../components/AuthApp/Input';
import { updateTeacher } from '../api/teachers'
import { updateStudent } from '../api/students';
import UserContext from '../containers/UserContext';

const editSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  lastname: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  bio: z.string().min(10, { message: 'Must provide a longer biography'}),
  age: z.coerce
    .number({ invalid_type_error: 'Invalid age' })
    .gte(18, 'Must be 18 and above'),
});

export default function EditForm({userType, name, lastname, bio, age, id, handleClose, handleShowConfirm}) {
  const { user, setUser } = useContext(UserContext);
  

  const initialValues = {
    name: name,
    lastname: lastname,
    bio: bio,
    age: age,
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
        {`Edit your info`}
      </div>
      <div
        className={cx(
          css`
            min-height: 496px;
          `,
          'd-flex flex-column justify-content-between',
        )}
      >
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              const formData = new FormData();
              for (const value in values) {
                formData.append(value, values[value]);
              }
              const edit = {
                teacher: updateTeacher,
                student: updateStudent,
              }[userType];

              const { data } = await edit({id,formData});

              setSubmitting(false);
              handleClose();
              handleShowConfirm();
              if (data) {
                setUser({
                  ...user,
                  profilePhoto: data.profilePhoto
                })
              }
              else {
                console.log('no provided photo')
              }
              
              
            }}
            validationSchema={toFormikValidationSchema(editSchema)}
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
                    Save
                  </Button>
                  </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
EditForm.propTypes = {
  userType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowConfirm: PropTypes.func.isRequired,
}
