import { Calendar, luxonLocalizer } from 'react-big-calendar'
import { DateTime } from 'luxon'
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 })
import { useState, useCallback, useEffect } from 'react'
import ReactModal from "react-modal";
import EventDisplay from "components/EventDisplay"
import "react-big-calendar/lib/css/react-big-calendar.css"

const CalendarView = ({ events }) => {
	const [selectedEvent, setSelectedEvent] = useState()

	useEffect(() => {
    ReactModal.setAppElement("#calendar-view")
  })

	const calendarEvents = events.map(event => {
		return {
			...event,
			start: new Date(`${event.start_date}T${event.start_time}`),
			end: new Date(`${event.end_date}T${event.end_time}`)
		}
	})

	const onSelectEvent = useCallback((calEvent) => {
    setSelectedEvent(calEvent)
  }, [])

	return (
		<div id="calendar-view">
		  <div className="h-[90vh] bg-white border-3 rounded-xl border-black p-3">
		    <Calendar
		      localizer={localizer}
		      events={calendarEvents}
		      startAccessor="start"
		      endAccessor="end"
		      onSelectEvent={onSelectEvent}
		    />
		  </div>
		  <ReactModal
        isOpen={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-lg mx-auto h-full"
        style={{
          overlay: { padding: "6vw", zIndex: 100 }
        }}
      >
      	<div className="h-full w-full bg-white border-black border-3 rounded-xl overflow-y-auto relative">
      		<div className="w-full flex justify-end absolute top-0 left-0 pr-2">
		        <button onClick={() => setSelectedEvent(null)} className={`text-lg font-medium btn-clear`}>✕</button>
		      </div>
	        <EventDisplay event={selectedEvent} closeModal={() => setSelectedEvent(null)} showImage={false} />
	      </div>
      </ReactModal>
	  </div>
	)
}

export default CalendarView