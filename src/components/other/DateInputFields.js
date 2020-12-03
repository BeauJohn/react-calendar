import React from 'react'

function DateInputFields({startDate, endDate}) {
   return (
      <div className="datePicker__inputFields">
         <div className="datePicker__start datePicker__input">
            <input type="text" value={startDate.notation} />
         </div>
         <div className="datePicker__end datePicker__input">
            <input type="text" value={endDate} />
         </div>
      </div>
   )
}

export default DateInputFields
