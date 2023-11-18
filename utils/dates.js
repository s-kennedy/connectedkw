import { DEFAULT_LOCALE, DATE_FORMAT, TIME_FORMAT } from 'utils/constants'

const buildDateString = (start_date, end_date, start_time, end_time) => {
  let startDateTimeString, endDateTimeString, fullDateTimeString

  // start date and time
  const startDateObj = new Date(start_date)
  startDateTimeString = startDateObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)

  if (start_time) {
    const startDateTimeObj = new Date(`${start_date}T${start_time}`)
    const startDateStr = startDateTimeObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)
    const startTimeSt = startDateTimeObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
    startDateTimeString = `${startDateStr}, ${startTimeSt}`
  }

  // end date and time

  // ends on same day and end time specified
  // just show end time
  if (end_time && (!end_date || end_date === start_date)) {
    const endTimeObj = new Date(`${start_date}T${end_time}`)
    endDateTimeString = endTimeObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
  }

  // ends on different day but no end time specified
  // just show end date
  if (!end_time && (end_date && end_date != start_date)) {
    const endDateObj = new Date(end_date)
    endDateTimeString = endDateObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)
  }

  // ends on different day and with end time specified
  // show end date and time
  if (end_time  && (end_date && end_date != start_date)) {
    const endDateTimeObj = new Date(`${end_date}T${end_time}`)
    const endDateString = endDateTimeObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)
    const endTimeString = endDateTimeObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
    endDateTimeString = `${endDateString}, ${endTimeString}`
  }

  fullDateTimeString = startDateTimeString

  if (endDateTimeString) {
    fullDateTimeString = [startDateTimeString, endDateTimeString].join(" - ")
  }

  return fullDateTimeString
}

const getCalendarDates = (start_date, end_date, start_time, end_time) => {
  const startDateObj = new Date(`${start_date}T${start_time}`)
  const endDateObj = new Date(`${end_date ? end_date : start_time}T${end_time}`)
  
  const calendarStartDate = `${startDateObj.toLocaleString(DEFAULT_LOCALE, { year: "numeric" })}-${startDateObj.toLocaleString(DEFAULT_LOCALE, { month: "2-digit" })}-${startDateObj.toLocaleString(DEFAULT_LOCALE, { day: "2-digit" })}`
  const calendarStartTime = `${startDateObj.toLocaleTimeString(DEFAULT_LOCALE, { hour: 'numeric', minute: '2-digit', hour12: false })}`

  const calendarEndDate = `${endDateObj.toLocaleString(DEFAULT_LOCALE, { year: "numeric" })}-${endDateObj.toLocaleString(DEFAULT_LOCALE, { month: "2-digit" })}-${endDateObj.toLocaleString(DEFAULT_LOCALE, { day: "2-digit" })}`
  const calendarEndTime = `${endDateObj.toLocaleTimeString(DEFAULT_LOCALE, { hour: 'numeric', minute: '2-digit', hour12: false })}`

  return {
    calendarStartDate,
    calendarStartTime,
    calendarEndDate,
    calendarEndTime
  }
}

export { buildDateString, getCalendarDates }
