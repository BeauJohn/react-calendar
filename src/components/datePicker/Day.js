import React from 'react'

function Day({ day, atChange, startDate, endDate }) {
   const { date, activeMonth, today } = day
   const activeMonthClass = activeMonth ? 'datePicker__activeMonth' : ''
   const todayClass = today ? 'datePicker__today' : ''
   /*
    TODO Selected day class & inrange class
   */

   const handleClick = (date) => {
      const dates = [date, endDate]
      atChange(dates)
      /* logic for multiple dates
         utility function get dates beetween dates (probably one level higher)
         if end active compare values
         then set the dates
          

      
      */

   
   }

   return (
      <div
         className={[activeMonthClass, todayClass, 'datePicker__day'].join(' ')}
         onClick={() => handleClick(date)}
      >
         {date.getDate()}
      </div>
   )
}

export default Day
