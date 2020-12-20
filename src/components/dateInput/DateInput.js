import React, { useState, useEffect, useRef } from 'react'
import { format, validDate, setClasses } from '../_utils'
import '../../style/dateInput.scss'

function DateInput({ date, atChange, multiple }) {
   const [currentDate, setCurrentDate] = useState('')
   const [newDate, setNewDate] = useState('')
   const [invalidDate, setInvalidDate] = useState(false)
   const [focus, setFocus] = useState(false)
   const inputRef = useRef(null)
   const classes = {
      dateInput: true,
      'dateInput--invalid': invalidDate,
      'dateInput--focus': focus
   }

   useEffect(() => {
      const options = { day: 'numeric', month: 'short', year: 'numeric' }
      const locale = 'en-US'
      const notation = format(date, options, locale)
      setCurrentDate(notation)
      setNewDate(notation)
   }, [date])

   const updateDate = (e) => {
      if (validDate(newDate)) {
         const date = new Date(newDate)
         setFocus(false)
         setInvalidDate(false)
         atChange(date)
      }
      if (newDate === '') setNewDate(currentDate)
      else if (!validDate(newDate)) setInvalidDate(true)
   }

   const onEnter = (e) => {
      if (e.key === 'Enter') inputRef.current.blur()
   }

   const handleFocus = (e) => {
      if (multiple) {
         setFocus((focus) => !focus)
      }
   }

   return (
      <div className={setClasses(classes)}>
         <input
            type="text"
            ref={inputRef}
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            onBlur={updateDate}
            onKeyPress={(e) => onEnter(e)}
            onFocus={handleFocus}
         />
      </div>
   )
}

export default DateInput
