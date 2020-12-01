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

export function getMonth(date) {
   if (!validDate(date)) {
      return new Date(NaN)
   }
   return date.getMonth()
}

export function addDays(date, n) {
   if (!validDate(date) || typeof n !== 'number') {
      return new Date(NaN)
   }
   const days = n > 0 ? Math.floor(n) : Math.ceil(n)
   const day = date.getDate()
   const newDate = new Date(date)
   newDate.setDate(day + days)
   return newDate
}

export function addMonth(date, n) {
   if (!validDate(date) || typeof n !== 'number') {
      return new Date(NaN)
   }
   const months = n > 0 ? Math.floor(n) : Math.ceil(n)
   const month = date.getMonth()
   const newDate = new Date(date)
   newDate.setMonth(month + months)
   return newDate
}

export function addYears(date, n) {
   if (!validDate(date) || typeof n !== 'number') {
      return new Date(NaN)
   }
   const years = n > 0 ? Math.floor(n) : Math.ceil(n)
   const year = date.getFullYear()
   const newDate = new Date(date)
   newDate.setFullYear(year + years)
   return newDate
}

export function isSameDay(dateLeft, dateRight) {
   //looks at the time -> might be better if checks for day
   if (!validDate(dateLeft) || !validDate(dateRight)) {
      return new Date(NaN)
   }
   const timeLeft = dateLeft.getTime()
   const timeRight = dateRight.getTime()
   return timeLeft === timeRight
}

//isEqual -> boolean
//formatting function -> string
//isToday -> boolean

export function validDate(d) {
   if (Object.prototype.toString.call(d) === '[object Date]') {
      if (isNaN(d.getTime())) {
         return false
      } else {
         return true
      }
   } else {
      return false
   }
}
