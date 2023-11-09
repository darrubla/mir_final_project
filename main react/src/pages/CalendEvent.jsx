import '../../src/styles/CalendEvent.css'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule'
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'

export function CalendEvent() {
  const calendarID = import.meta.env.VITE_CALENDAR_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const remoteData = new DataManager({
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}`,
    adaptor: new WebApiAdaptor(),
    crossDomain : true
  });
  // const accessToken = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN;

  function onDataBinding (e) {
    let items = e.result.items;
    let schedulerData = []
    if (items.length > 0) {
      for (let event of items) {
        let isAllDay = !event.start.dateTime;
        let start = event.start.dateTime;
        let end = event.end.items;
        if (isAllDay) {
          start = event.start.date;
          end = event.end.date;
        }

        schedulerData.push({
          Id: event.id,
          Subject : event.summary,
          StartTime: new Date(start),
          EndTime: new Date(end),
          isAllDay: isAllDay
        });
      }
    }
    e.result=schedulerData;
  }
  
  return (
    <div className="App py-8 flex flex-col justify-center">
      <ScheduleComponent width='100%' height='650px' currentView='Month'
        eventSettings={{dataSource: remoteData}}
        dataBinding={onDataBinding}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}></Inject>
      </ScheduleComponent>
    </div>
  );
}
