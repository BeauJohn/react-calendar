import React from 'react'

function Switcher({ toggle, children }) {
   return (
      <div className="switcher">
         <button onClick={toggle}>{children}</button>
      </div>
   )
}

export default Switcher
