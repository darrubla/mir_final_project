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
      classList.push({
        title: `${item.subject.subjectname} class: ${item.description}`,
        start: item.scheduledAt
      })
    })
    console.log(classList)
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
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content:
                `<p><strong>Starts at:</strong>${info.event.start}</p><p><strong>Duration</strong>1 hour</p>`,
              html: true,
            });
          }}
        />
      </div>
    </div>
    
  )
}

