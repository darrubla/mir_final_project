import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import * as bootstrap from "bootstrap";

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

export default function MyCalendar() {
  const events = [
    {
      title: "The title",
      start: "2023-11-05T15:00:00",
      end: "2023-11-05T17:00:00",
    },
  ]
  return (
    <div className='mt-5 m-3 pt-5'>
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
        events={events}
        selectable='true'
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content:
              `<p><strong>Starts at:</strong>${info.event.start}</p><p><strong>Finishes at:</strong>${info.event.end}</p>`,
            html: true,
          });
        }}
      />
    </div>
    
  )
}

