import React from 'react'

function Weekdays() {
   const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

   return (
      <div className="calendar__weekdays  calendar__row">
         {weekdays.map((day, i) => (
            <div key={i} className="calendar__weekday calendar__day">
               {day}
            </div>
         ))}
      </div>
   )
}

export default Weekdays
