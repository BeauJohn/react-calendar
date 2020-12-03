import React, {useState, useEffect} from 'react'
import {format, addMonth} from './_utils'

function Controls({ activeMonth, traverseMonth }) {
   const [month, setMonth] = useState('')

   useEffect(() => {
      const options = {month: 'long'}
      const locale = 'en-US'
      const notation = format(activeMonth, options, locale)
      setMonth(notation)
   }, [activeMonth])

   const traverse = (n) => {
      const date = addMonth(activeMonth, n)
      traverseMonth(date)   
   }

   return (
      <div className="datePicker__monthControl">
         <div className="datePicker__month">{month}</div>
         <div className="datePicker__buttons">
            <button
               className="monthControl__prev monthControl__button"
               onClick={() => traverse(-1)}
            >
               {'<'}
            </button>
            <button
               className="monthControl__next monthControl__button"
               onClick={() => traverse(1)}
            >
               {'>'}
            </button>
         </div>
      </div>
   )
}

export default Controls
