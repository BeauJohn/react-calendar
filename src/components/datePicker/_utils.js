export function getDaysInMonth(date) {
   if (!validDate(date)) {
      return new Date(NaN)
   }
   const year = date.getFullYear()
   const month = date.getMonth() + 1
   return new Date(year, month, 0).getDate()
}

export function getStartOfMonth(date) {
   if (!validDate(date)) {
      return new Date(NaN)
   }
   return new Date(date.setDate(1))
}

export function addDays(date, n) {
   if (!validDate(date) || typeof n !== 'number') {
      return new Date(NaN)
   }
   const days = n > 0 ? Math.floor(n) : Math.ceil(n)
   const day = date.getDate()
   const nDate = new Date(date)
   nDate.setDate(day + days)
   return nDate
}

export function addMonth(date, n) {
   if (!validDate(date) || typeof n !== 'number') {
      return new Date(NaN)
   }
   const months = n > 0 ? Math.floor(n) : Math.ceil(n)
   const month = date.getMonth()
   const nDate = new Date(date)
   nDate.setMonth(month + months)
   return nDate
}

export function addYears(date, n) {
   if (!validDate(date) || typeof n !== 'number') {
      return new Date(NaN)
   }
   const years = n > 0 ? Math.floor(n) : Math.ceil(n)
   const year = date.getFullYear()
   const nDate = new Date(date)
   nDate.setFullYear(year + years)
   return nDate
}

export function isSameDay(dateLeft, dateRight) {
   if (!validDate(dateLeft) || !validDate(dateRight)) {
      return new Date(NaN)
   }
   const timeLeft = new Date(dateLeft)
   const timeRight = new Date(dateRight)
   timeLeft.setHours(0, 0, 0, 0)
   timeRight.setHours(0, 0, 0, 0)
   return timeLeft.toString() === timeRight.toString()
}

export function isThisMonth(date) {
   if (!validDate(date)) {
      return new Date(NaN)
   }
   const currentdate = new Date()
   return isSameMonth(currentdate, date)
}

export function format(date, format, locales) {
   if (!validDate(date) || typeof format !== 'object') {
      return new Date(NaN)
   } else if (locales && typeof locales !== 'string') {
      return 'Invalid locales'
   }
   const nDate = new Date(date)
   return nDate.toLocaleDateString(locales, format)
}

export function isToday(date) {
   if (!validDate(date)) {
      return new Date(NaN)
   }
   const today = new Date()
   const day = new Date(date)
   return isSameDay(today, day)
}

export function validDate(date) {
   if (Object.prototype.toString.call(date) === '[object Date]') {
      if (isNaN(date.getTime())) {
         return false
      } else {
         return true
      }
   } else {
      return false
   }
}

export function isSameMonth(dateLeft, dateRight) {
   if (!validDate(dateLeft) && !validDate(dateRight)) {
      return new Date(NaN)
   }
   const yearLeft = dateLeft.getFullYear()
   const yearRight = dateRight.getFullYear()
   const monthLeft = dateLeft.getMonth()
   const monthRight = dateRight.getMonth()
   return yearLeft === yearRight && monthLeft === monthRight
}

export function getMonthCalendar(date) {
   if (!validDate(date)) {
      return new Date(NaN)
   }
   let nDate = new Date(date)
   const today = new Date()
   const arr = []
   const days = 42
   const firstDayMonth = getStartOfMonth(nDate)
   const startWeekdayMonth = firstDayMonth.getDay()
   const startDayMonth = 1
   const startOfCalendar = startDayMonth - startWeekdayMonth

   nDate.setDate(startOfCalendar)

   for (let i = 0; i < days; i++) {
      const object = {
         date: nDate,
         activeMonth: isSameMonth(nDate, date),
         today: false
      }
      arr.push(object)
      nDate = addDays(nDate, 1)
   }

   if (isSameMonth(date, today)) {
      const i = today.getDate() + startWeekdayMonth - 1
      arr[i].today = true
   }

   return arr
}
