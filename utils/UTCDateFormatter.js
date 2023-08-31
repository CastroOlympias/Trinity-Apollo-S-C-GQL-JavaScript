module.exports = (UTCFullDateData, { UTCWeekDayLength = 'short', UTCMonthLength = 'short' } = {}) => {
  // example format if you feed date data that is current date. This will "Saturday November 11 2023 @ 14:44 & 17 Seconds"
  //  let UTCFullDate = new Date(UTCFullDateData); 'UTCFullDateData' this needs to be in the new Date() to keep the date frozen, otherwise refreshing the app will use the current date and time from the server
  let UTCFullDate = new Date(UTCFullDateData);
  let UTCFullDateAndTIme = UTCFullDate
  let UTCWeekDay = UTCFullDate.getUTCDay()
  let UTCMonth = UTCFullDate.getUTCMonth() + 1
  let UTCDate = UTCFullDate.getUTCDate()
  let UTCYear = UTCFullDate.getUTCFullYear()
  let UTCHour = UTCFullDate.getUTCHours()
  let UTCMinute = UTCFullDate.getUTCMinutes()
  let UTCSecond = UTCFullDate.getUTCSeconds()

  if (UTCWeekDay === 0 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Sunday'
    UTCDay = 'Sunday'
  }
  if (UTCWeekDay === 0 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Sun'
  }
  if (UTCWeekDay === 1 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Monday'
  }
  if (UTCWeekDay === 1 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Mon'
  }
  if (UTCWeekDay === 2 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Tuesday'
  }
  if (UTCWeekDay === 2 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Tue'
  }
  if (UTCWeekDay === 3 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Wednesday'
  }
  if (UTCWeekDay === 3 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Wed'
  }
  if (UTCWeekDay === 4 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Thursday'
  }
  if (UTCWeekDay === 4 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Thu'
  }
  if (UTCWeekDay === 5 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Friday'
  }
  if (UTCWeekDay === 5 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Fri'
  }
  if (UTCWeekDay === 6 && UTCWeekDayLength === 'long') {
    UTCWeekDay = 'Saturday'
  }
  if (UTCWeekDay === 6 && UTCWeekDayLength === 'short') {
    UTCWeekDay = 'Sat'
  }
  if (UTCMonth === 1 && UTCMonthLength === 'long') {
    UTCMonth = 'January'
  }
  if (UTCMonth === 1 && UTCMonthLength === 'short') {
    UTCMonth = 'Jan'
  }
  if (UTCMonth === 2 && UTCMonthLength === 'long') {
    UTCMonth = 'February'
  }
  if (UTCMonth === 2 && UTCMonthLength === 'short') {
    UTCMonth = 'Feb'
  }
  if (UTCMonth === 3 && UTCMonthLength === 'long') {
    UTCMonth = 'March'
  }
  if (UTCMonth === 3 && UTCMonthLength === 'short') {
    UTCMonth = 'Mar'
  }
  if (UTCMonth === 4 && UTCMonthLength === 'long') {
    UTCMonth = 'April'
  }
  if (UTCMonth === 4 && UTCMonthLength === 'short') {
    UTCMonth = 'Apr'
  }
  if (UTCMonth === 5 && UTCMonthLength === 'long') {
    UTCMonth = 'May'
  }
  if (UTCMonth === 5 && UTCMonthLength === 'short') {
    UTCMonth = 'May'
  }
  if (UTCMonth === 6 && UTCMonthLength === 'long') {
    UTCMonth = 'June'
  }
  if (UTCMonth === 6 && UTCMonthLength === 'short') {
    UTCMonth = 'Jun'
  }
  if (UTCMonth === 7 && UTCMonthLength === 'long') {
    UTCMonth = 'July'
  }
  if (UTCMonth === 7 && UTCMonthLength === 'short') {
    UTCMonth = 'Jul'
  }
  if (UTCMonth === 8 && UTCMonthLength === 'long') {
    UTCMonth = 'August'
  }
  if (UTCMonth === 8 && UTCMonthLength === 'short') {
    UTCMonth = 'Aug'
  }
  if (UTCMonth === 9 && UTCMonthLength === 'long') {
    UTCMonth = 'September'
  }
  if (UTCMonth === 9 && UTCMonthLength === 'short') {
    UTCMonth = 'Sep'
  }
  if (UTCMonth === 10 && UTCMonthLength === 'long') {
    UTCMonth = 'October'
  }
  if (UTCMonth === 10 && UTCMonthLength === 'short') {
    UTCMonth = 'Oct'
  }
  if (UTCMonth === 11 && UTCMonthLength === 'long') {
    UTCMonth = 'November'
  }
  if (UTCMonth === 11 && UTCMonthLength === 'short') {
    UTCMonth = 'Nov'
  }
  if (UTCMonth === 12 && UTCMonthLength === 'long') {
    UTCMonth = 'December'
  }
  if (UTCMonth === 12 && UTCMonthLength === 'short') {
    UTCMonth = 'Dec'
  }

  if (UTCHour.toString().length === 1) {
    UTCHour = '0' + UTCHour
  }
  if (UTCMinute.toString().length === 1) {
    UTCMinute = '0' + UTCMinute
  }
  if (UTCSecond.toString().length === 1) {
    UTCSecond = '0' + UTCSecond
  }

  // const UTCDateFormatted = UTCWeekDay + ' ' + UTCMonth.toString() + ' ' + UTCDate + ' ' + UTCYear + ' ' + '@' + ' ' + UTCHour + ':' + UTCMinute + ' ' + '&' + ' ' + UTCSecond + ' ' + 'Seconds'

  const date = UTCWeekDay + ' ' + UTCMonth + ' ' + UTCDate + ' ' + UTCYear
  // const time = UTCHour + ':' + UTCMinute + ' ' + '&' + ' ' + UTCSecond + ' ' + 'Secs'
  const time = UTCHour + ':' + UTCMinute + ':' + UTCSecond

  const UTCDateFormatted = [UTCFullDateAndTIme, time, date, UTCMonth, UTCYear]
  return UTCDateFormatted
}