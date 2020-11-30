/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Weekdays from './Weekdays'
import CalendarBody from './CalendarBody'

function Calendar(props) {
   return (
      <div className="dateSelector__calendar">
         <Weekdays />
         <CalendarBody {...props}/>
      </div>
   )
}

export default Calendar
