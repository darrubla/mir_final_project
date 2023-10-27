import Button from 'react-bootstrap/Button'
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Calendar from 'react-calendar'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod'
import { ListSelect } from './ListSelect'
import { FormDescription } from './FormDescription'
import { DateText } from './DateText'
import { TimePicker } from './TimePicker'
import { locations } from '../text/constants'
import { getSubjectId } from '../api/subjects'
import PropTypes from 'prop-types'
import 'react-calendar/dist/Calendar.css'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export function ScheduleForm({ onCreate, options }) {
  const pLocation = useLocation()
  const queryParams = new URLSearchParams(pLocation.search)
  const teacherIdParam = queryParams.get('teacherId')

  const scheduleSchema = z.object({
    subject: z.enum(options, {
      errorMap: () => ({ message: 'Please select a valid subject' }),
    }),
    topicdescription: z
      .string()
      .min(20, { message: 'Provide a longer topic description' }),
    location: z.enum(locations, {
      errorMap: () => ({ message: 'Please select a valid location' }),
    }),
    locationdescription: z
      .string()
      .min(10, { message: 'Provide a longer description' }),
    scheduledate: z.string(),
    scheduletime: z.string(),
  })

  const [dateValue, onDateChange] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  )
  const [dateSelected, setDateSelected] = useState(
    `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`,
  )
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('00')
  const [dataSubject, setDataSubject] = useState('')

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }
  const handleShowTime = () => {
    setShowTime(!showTime)
  }
  const handleCloseCalendar = () => {
    setShowCalendar(false)
  }

  const initialValues = {
    subject: '',
    topicdescription: '',
    location: '',
    locationdescription: '',
    scheduledate: dateSelected,
    scheduletime: `${hour}:${minute}:00`,
    scheduledatetime: new Date(`${dateSelected}T${hour}:${minute}:00`),
  }
  async function loadSubject(subjectname) {
    try {
      const response = await getSubjectId(subjectname)
      setDataSubject(response.data.id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const lessonContent = {}
        lessonContent.site = values.location
        lessonContent.description = values.topicdescription
        lessonContent.scheduledAt = values.scheduledatetime
        lessonContent.locInfo = values.locationdescription
        lessonContent.subjectId = dataSubject

        if (teacherIdParam) {
          lessonContent.teacherId = teacherIdParam
          lessonContent.status = 'Scheduled'
        }
        onCreate({
          lessonContent,
        })
        setHour('12')
        setMinute('00')
        resetForm({
          subject: '',
          topicdescription: '',
          location: '',
          locationdescription: '',
          scheduledate: new Date(new Date().setDate(new Date().getDate() + 1)),
          scheduletime: `${hour}:${minute}:00`,
        })
        setSubmitting(false)
      }}
      validationSchema={toFormikValidationSchema(scheduleSchema)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        handleReset,
      }) => (
        <div className='form-schedule-container justify-content-center'>
          <Form
            className='d-flex flex-row justify-content-center gap-4'
            onSubmit={handleSubmit}
          >
            <Container>
              <Row className='gap-2u'>
                <Col className='p-0 d-flex flex-column gap-3'>
                  <div
                    className='list-container'
                    onClick={() => {
                      const subjectname = values.subject
                      if (subjectname) {
                        loadSubject(subjectname)
                      }
                    }}
                  >
                    <ListSelect
                      optionsList={options}
                      fieldName='SUBJECT'
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={values.subject}
                      className={
                        touched.subject && errors.subject ? ' is-invalid' : ''
                      }
                    />
                  </div>
                  <FormDescription
                    fieldName='topic description'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    val={values.topicdescription}
                    classN={
                      touched.topicdescription && errors.topicdescription
                        ? 'is-invalid'
                        : ''
                    }
                  />

                  <DateText
                    fieldName='schedule date'
                    handleShow={handleShowCalendar}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.scheduledate}
                    className={
                      touched.scheduledate && errors.scheduledate
                        ? 'is-invalid'
                        : ''
                    }
                  />
                  {showCalendar && (
                    <Calendar
                      onHide={handleCloseCalendar}
                      onChange={onDateChange}
                      value={dateSelected}
                      onClickDay={(dateValue) => {
                        handleShowCalendar()
                        setDateSelected(
                          `${dateValue.getFullYear()}-${(
                            dateValue.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, '0')}-${dateValue
                            .getDate()
                            .toString()
                            .padStart(2, '0')}`,
                        )
                        values.scheduledate = `${dateValue.getFullYear()}-${(
                          dateValue.getMonth() + 1
                        )
                          .toString()
                          .padStart(2, '0')}-${dateValue
                          .getDate()
                          .toString()
                          .padStart(2, '0')}`
                        values.scheduledatetime = new Date(
                          `${values.scheduledate}T${values.scheduletime}`,
                        )
                      }}
                      minDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                      }
                    />
                  )}
                  <div className='d-grid m-0'>
                    <Button
                      variant='outline-danger'
                      className='rounded-3 d-flex btn-register px-5 py-2 justify-content-center'
                      onClick={handleReset}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
                <Col className='p-0 d-flex flex-column gap-3'>
                  <ListSelect
                    optionsList={locations}
                    fieldName='LOCATION'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.location}
                    className={
                      touched.location && errors.location ? ' is-invalid' : ''
                    }
                  />
                  <FormDescription
                    fieldName='location description'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    val={values.locationdescription}
                    classN={
                      touched.locationdescription && errors.locationdescription
                        ? 'is-invalid'
                        : ''
                    }
                  />
                  <div>
                    <DateText
                      fieldName='schedule time'
                      handleShow={handleShowTime}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      value={`${values.scheduletime}`}
                      className={
                        touched.scheduletime && errors.scheduletime
                          ? 'is-invalid'
                          : ''
                      }
                    />
                    {showTime && (
                      <TimePicker
                        handleChange={(event) => {
                          if (event.target.name === 'hour') {
                            setHour(event.target.value)
                            values.scheduletime = `${event.target.value}:${minute}:00`
                            values.scheduledatetime = new Date(
                              `${values.scheduledate}T${values.scheduletime}`,
                            )
                          }
                          if (event.target.name === 'minute') {
                            setMinute(event.target.value)
                            values.scheduletime = `${hour}:${event.target.value}:00`
                            values.scheduledatetime = new Date(
                              `${values.scheduledate}T${values.scheduletime}`,
                            )
                          }
                        }}
                        valueHour={hour}
                        valueMinute={minute}
                      />
                    )}
                  </div>
                  <div className='d-grid'>
                    <Button
                      variant='nexus-accent-subtle'
                      className='rounded-3 d-flex btn-register px-5 py-2 justify-content-center'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Schedule
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      )}
    </Formik>
  )
}

ScheduleForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  options: PropTypes.array,
}
