import React from 'react'

function Weekdays() {
   const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

   return (
      <div className="datePicker__weekdays  datePicker__row">
         {weekdays.map((day, i) => (
            <div key={i} className="datePicker__weekday datePicker__day">
               {day}
            </div>
         ))}
      </div>
   )
}

export default Weekdays
