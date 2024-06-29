import { DEFAULT_LOCALE, DATE_FORMAT, TIME_FORMAT } from 'utils/constants'
import { DateTime } from 'luxon'

const buildDateString = (starts_at, ends_at) => {
  let startDateTimeString, endDateTimeString, fullDateTimeString

  // start date and time
  const startDateObj = new Date(starts_at)
  startDateTimeString = startDateObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)

  if (starts_at) {
    const startDateTimeObj = new Date(`${starts_at}`)
    const startDateStr = startDateTimeObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)
    const startTimeSt = startDateTimeObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
    startDateTimeString = `${startDateStr}, ${startTimeSt}`
  }

  // end date and time

  // ends on same day and end time specified
  // just show end time
  if (ends_at && ends_at === starts_at) {
    const endTimeObj = new Date(`${starts_at}`)
    endDateTimeString = endTimeObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
  }

  fullDateTimeString = startDateTimeString

  if (endDateTimeString) {
    fullDateTimeString = [startDateTimeString, endDateTimeString].join(" - ")
  }

  return fullDateTimeString
}

const getCalendarDates = (starts_at, ends_at) => {
  const startDateObj = new Date(starts_at)
  let endDateObj;
  if (ends_at) {
    endDateObj = new Date(ends_at)
  } else {
    const luxonDate = DateTime.fromISO(`${starts_at}`)
    const oneHourLater = luxonDate.plus({ hours: 1 }).toISO()
    endDateObj = new Date(oneHourLater)
  }
  
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
