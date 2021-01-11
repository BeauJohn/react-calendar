import React, { useState, useEffect } from 'react'
import Weekdays from './Weekdays'
import Month from './Month'
import Controls from './Controls'
import '../../style/datePicker.scss'

function Datepicker(props) {
   const { startDate, rangeSelection } = props
   const [activeMonth, setActiveMonth] = useState(startDate)
   const [activeBound, setActiveBound] = useState({
      inner: false,
      outer: false
   })

   useEffect(() => {
      setActiveMonth(startDate)
   }, [startDate])

   useEffect(() => {
      if (rangeSelection)
         setActiveBound((activeBound) => ({ ...activeBound, outer: true }))
      else setActiveBound({ inner: false, outer: false })
   }, [rangeSelection])

   const updateActiveBound = (value) => {
      if (value === 'inner') setActiveBound({ inner: true, outer: false })
      if (value === 'outer') setActiveBound({ inner: false, outer: true })
      if (value === 'switch')
         setActiveBound((currentState) => ({
            inner: !currentState.inner,
            outer: !currentState.outer
         }))
   }

   return (
      <div className="datePicker">
         <Controls
            traverseMonth={(date) => setActiveMonth(date)}
            activeMonth={activeMonth}
         />
         <Weekdays />
         <Month
            activeMonth={activeMonth}
            setOuterMonth={(date) => setActiveMonth(date)}
            activeBound={activeBound}
            updateActiveBound={updateActiveBound}
            {...props}
         />
      </div>
   )
}

export default Datepicker
