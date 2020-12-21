import './style/App.scss'
import React, { useState } from 'react'
import DatePicker from './components/datePicker/DatePicker'
import DateInput from './components/dateInput/DateInput'
import Switcher from './components/Switcher'

function App() {
   const [startDate, setStartDate] = useState(new Date())
   const [endDate, setEndDate] = useState(null)
   const [range, setRange] = useState(false)

   const handleChange = (dates) => {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
   }

   return (
      <div className="App">
         <div className="datePicker__wrapper">
            <div className="DateInputFields">
               <DateInput
                  date={startDate}
                  atChange={(date) => setStartDate(date)}
                  multiple={range}
               />
               {range && (
                  <DateInput
                     date={endDate}
                     atChange={(date) => setEndDate(date)}
                     multiple={range}
                  />
               )}
            </div>
            {range ? (
               <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  atChange={handleChange}
                  rangeSelection
               />
            ) : (
               <DatePicker
                  startDate={startDate}
                  atChange={(date) => setStartDate(date)}
               />
            )}
            <Switcher toggle={() => setRange((range) => !range)} />
         </div>
      </div>
   )
}

export default App
