import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'


import "react-big-calendar/lib/css/react-big-calendar.css"
const locales = {
  'en-US': enUS,
}



export default function MyCalendar({myEventsList}) {
   
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      })
    return <div style={{backgroundColor:"#999"}}>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "600px" }}
    />
  </div>
}