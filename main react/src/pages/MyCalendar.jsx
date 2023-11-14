import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import * as bootstrap from "bootstrap";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useContext, useEffect, useState } from 'react';
import { getMe } from '../api/teachers';
import { getMyself } from '../api/students';
import UserContext from '../containers/UserContext';
import { Loading } from '../animation/Loading';
import { Alert } from 'react-bootstrap';

export default function MyCalendar() {
  const { user } = useContext(UserContext);
  const [loadMyInfo, setLoadMyInfo] = useState(false);
  const [errorMyInfo, setErrorMyInfo] = useState('');
  const [info, setInfo] = useState()


  async function loadInfo(type) {
    setLoadMyInfo(true);
    setErrorMyInfo('');
    try {
      if (type === 'student') {
        const response=await getMyself();
        setInfo(response.data)
      }
      if (type === 'teacher') {
        const response=await getMe();
        setInfo(response.data)
      }
    } catch (error) {
        setErrorMyInfo(error)
    } finally {
        setLoadMyInfo(false)
    }
  }
  useEffect(() => {
    if (user) {
      loadInfo(user.type)
    }
  }, [user]);

  let classList = []
  
  if (info?.lesson.length>0) {
    info.lesson.map((item) => {
      if (item.teacher) {
        console.log(item.teacher)
        classList.push({
          title: `${item.subject.subjectname} class.`,
          start: item.scheduledAt,
          site: item.site,
          description: item.description,
          teacher: `${item.teacher.name} ${item.teacher.lastname} - ${item.teacher.email}`,
          student: `${item.student.name} ${item.student.lastname} - ${item.student.email}`,
        })
      }
      
    })
  }

  const events = [
    {
      title: "The title",
      start: "2023-11-05T15:00:00",
      end: "2023-11-05T17:00:00",
    },
  ]
  return (
    <div className='mt-5 m-5 pt-5'>
      <div className='pt-5'>
        {loadMyInfo && <Loading/>}
        {errorMyInfo &&<Alert variant='danger'>{errorMyInfo}</Alert>}
        <FullCalendar
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin,bootstrap5Plugin]}
          themeSystem= 'bootstrap5'
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: "today prev,next",
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          height={'90vh'}
          events={classList}
          selectable='true'
          eventDidMount={(inf) => {
            return new bootstrap.Popover(inf.el, {
              title: inf.event.title,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content:
                `<p><strong>Starts at: </strong>${inf.event.start}</p>
                  <p><strong>Description: </strong>${inf.event.extendedProps.description}</p>
                  <p><strong>Teacher: </strong>${inf.event.extendedProps.teacher}</p>
                  <p><strong>Student: </strong>${inf.event.extendedProps.student}</p>
                  <p><strong>Duration: </strong>1 hour</p>
                  <p><strong>Site: </strong>${inf.event.extendedProps.site}</p>
                  `,
              html: true,
            });
          }}
        />
      </div>
    </div>
    
  )
}

