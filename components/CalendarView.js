import { Calendar, luxonLocalizer } from 'react-big-calendar'
import { DateTime } from 'luxon'
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 })
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useCallback } from 'react'

const CalendarView = ({ events }) => {
	const calendarEvents = events.map(event => {
		return {
			...event,
			start: new Date(`${event.start_date}T${event.start_time}`),
			end: new Date(`${event.end_date}T${event.end_time}`)
		}
	})

	const onSelectEvent = useCallback((calEvent) => {
    console.log(calEvent)
  }, [])

	return (
	  <div className="h-[90vh] bg-white border-3 rounded-xl border-black p-3">
	    <Calendar
	      localizer={localizer}
	      events={calendarEvents}
	      startAccessor="start"
	      endAccessor="end"
	      onSelectEvent={onSelectEvent}
	    />
	  </div>
	)
}

export default CalendarView