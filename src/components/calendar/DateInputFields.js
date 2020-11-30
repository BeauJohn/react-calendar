import React from 'react'

function DateInputFields({startDate, endDate}) {
   return (
      <div className="dateSelector__inputFields">
         <div className="dateSelector__start dateSelector__input">
            <input type="text" value={startDate.notation} />
         </div>
         <div className="dateSelector__end dateSelector__input">
            <input type="text" value={endDate} />
         </div>
      </div>
   )
}

export default DateInputFields
