import './style/App.scss'
import React, { useState } from 'react'
import DatePicker from './components/datePicker/DatePicker'

function App() {
   const [startDate, setStartDate] = useState(new Date())
   const [endDate, setEndDate] = useState(null)

   console.log(startDate)

   const handleChange = (dates) => {
      const [start, end] = dates
      if (end) {
         setEndDate(end)
      }
      
      setStartDate(start)
   }

   return (
      <div className="App">
         {/* input fields */}
         <DatePicker
            startDate={startDate}
            endDate={endDate}
            atChange={handleChange}
         />
      </div>
   )
}

export default App
