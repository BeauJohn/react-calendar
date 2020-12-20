import React, { useState, useEffect } from 'react'
import Weekdays from './Weekdays'
import Month from './Month'
import Controls from './Controls'
import '../../style/datePicker.scss'

function Datepicker(props) {
   const { startDate, rangeSelection } = props
   const [activeMonth, setActiveMonth] = useState(startDate)
   const [innerActive, setInnerActive] = useState(false)
   const [outerActive, setOuterActive] = useState(false)

   useEffect(() => {
      setActiveMonth(startDate)
      if (rangeSelection) setInnerActive(true)
      else setInnerActive(false)
   }, [startDate, rangeSelection])

   return (
      <div className="datePicker">
         <Controls
            traverseMonth={(date) => setActiveMonth(date)}
            activeMonth={activeMonth}
         />
         <Weekdays />
         {/* <Month
            activeMonth={activeMonth}
            setOuterMonth={(date) => setActiveMonth(date)}
            {...props}
         /> */}
      </div>
   )
}

export default Datepicker
