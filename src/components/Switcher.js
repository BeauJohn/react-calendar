import React from 'react'
import '../style/switcher.scss'

function Switcher({ toggle, children }) {
   return (
      <div className="switcher">
         <div className="switcher__text">{children}</div>
         <div className="switcher__inputWrapper">
            <label>
               <input onClick={toggle} type="checkbox" />
               <span className="slider round"></span>
            </label>
         </div>
      </div>
   )
}

export default Switcher
