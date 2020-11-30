import React from 'react'

function Controls({ month, traverse }) {
   return (
      <div className="dateSelector__monthControl">
         <div className="dateSelector__month">{month}</div>
         <div className="dateSelector__buttons">
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
