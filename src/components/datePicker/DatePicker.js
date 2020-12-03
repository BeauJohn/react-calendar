/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Weekdays from './Weekdays'
import Month from './Month'
import Controls from './Controls'

function Datepicker(props) {
   const [activeMonth, setActiveMonth] = useState(props.startDate)
   
   return (
      <div className="datePicker">
         <Controls
            traverseMonth={(date) => setActiveMonth(date)}
            activeMonth={activeMonth}
         />
         <Weekdays />
         <Month activeMonth={activeMonth} {...props} />
      </div>
   )
}

export default Datepicker
