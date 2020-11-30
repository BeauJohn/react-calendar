import React, { useState, useEffect } from 'react'

function CalendarBody({ currentDate, month, pickDate }) {
   const [calendar, setCalendar] = useState([])
   const [today] = useState(currentDate.getDate())
   const [currentMonth] = useState(new Date().getMonth())

   const monthDays = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
   }

   const inRange = (target, min, max) => {
      return target >= min && target <= max
   }


   useEffect(() => {
      const arr = []
      const monthArr = []
      const daysInCurrentMonth = monthDays(month)
      const firstWeekDayMonth = new Date(month.setDate(1)).getDate()
      const firstDayMonth = new Date(month.setDate(1)).getDay()
      const startCalendar = new Date(month)

      startCalendar.setDate(firstWeekDayMonth - firstDayMonth)


      for (let i = 0; i < 42; i++) {
         const range = inRange(
            i,
            firstDayMonth,
            (daysInCurrentMonth - 1 ) + firstDayMonth
         )
         const monthInd = month.getMonth()
         const isToday = i === today - 1 && monthInd === currentMonth
         const todayClass = range && isToday ? 'calendar__today ' : ''
         const activeMonthClass = range ? ' calendar__currentMonth' : ''
         const classes = todayClass + activeMonthClass 

         const date = {
            date: startCalendar,
            day: startCalendar.getDate(),
            notation: startCalendar.toLocaleDateString('en-US', {
               month: 'short',
               day: 'numeric',
               year: 'numeric'
            }),
            classes: classes
         }
         arr.push(date)
         startCalendar.setDate(startCalendar.getDate() + 1)
      }

      while (arr.length > 0) {
         const week = arr.splice(0, 7)
         monthArr.push(week)
      }
      setCalendar(monthArr)
   }, [setCalendar, month])



   return (
      <div className="calendar__body">
         {calendar.map((week, i) => (
            <div key={i} className="calendar__week calendar__row">
               {week.map(({date, day, notation, classes }) => (
                  <div
                     onClick={() => pickDate(date, notation)}
                     key={day}
                     className={`calendar__date calendar__day ${classes}`}
                     data-date={notation}
                  >
                     {day}
                  </div>
               ))}
            </div>
         ))}
      </div>
   )
}

export default CalendarBody
