import React, { useState, useEffect } from 'react'
import { getMonthCalendar } from './_utils'
import Day from './Day'

function Month(props) {
   const { activeMonth } = props
   const [calendar, setCalendar] = useState([])

   useEffect(() => {
      let nCalendar = getMonthCalendar(activeMonth)
      setCalendar(nCalendar)
   }, [activeMonth])

   const divideInWeeks = (calendarArr) => {
      const nCalendar = [...calendarArr]
      const arr = []

      while (nCalendar.length > 0) {
         const week = nCalendar.splice(0, 7)
         arr.push(week)
      }
      return arr
   }

   return (
      <div className="datePicker__body">
         {divideInWeeks(calendar).map((week, i) => (
            <div key={i} className="datePicker__week datePicker__row">
               {week.map((day, i) => (
                  <Day key={i} day={day} {...props} />
               ))}
            </div>
         ))}
      </div>
   )
}

export default Month
