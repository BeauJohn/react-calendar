import React from 'react'

function Switcher({ toggle }) {
   return (
      <div className="switcher">
         <button onClick={toggle}>End date</button>
      </div>
   )
}

export default Switcher
