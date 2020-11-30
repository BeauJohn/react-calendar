/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Calendar from './Calendar'
import DateInputFields from './DateInputFields'
import Controls from './Controls'
import './style/dateSelector.scss'

function DateSelector() {
   //TODO: Set start date and end date
   const [startDate, setStartDate] = useState({
      date: new Date(),
      active: false,
      notation: ''
   })
   const [endDate, setEndDate] = useState('')
   const [currentDate,setCurrentDate] = useState(new Date())
   const [month, setNewMonth] = useState(new Date())

   const traverseMonth = (dir) => {
      const newMonth = new Date(month)
      newMonth.setMonth(newMonth.getMonth() + dir)
      setNewMonth(newMonth)
   }

   const pickDate = (date, notation) => { 
      setStartDate((startDate) => ({
         ...startDate,
         date: date,
         notation: notation
      }))
   }

   const getNotation = (date) =>
      date.toLocaleDateString('en-US', { month: 'long' })

   return (
      <div className="dateSelector">
         <DateInputFields startDate={startDate} endDate={endDate} />
         <Controls month={getNotation(month)} traverse={traverseMonth} />
         <Calendar
            currentDate={currentDate}
            month={month}
            pickDate={pickDate}
         />
      </div>
   )
}

export default DateSelector
