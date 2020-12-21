import React from 'react'
import { isWithinRange, isSameDay, isSameMonth, setClasses } from '../_utils'

function Day(props) {
   const { date } = props.day

   const isSelected = () => {
      const { day, outerActive, startDate } = props
      const { date } = day
      const selectedDay = isSameDay(date, startDate)
      return selectedDay && !outerActive
   }

   const isInnerBound = () => {
      const { day, innerActive, startDate } = props
      const { date } = day
      const selectedDay = isSameDay(date, startDate)
      return selectedDay && innerActive
   }

   const isOuterBound = () => {
      const { day, outerActive, endDate } = props
      const { date } = day
      const selectedDay = isSameDay(date, endDate)
      return selectedDay && outerActive
   }

   const isOnlyToday = () => {
      const { day, startDate, endDate } = props
      const { date, today } = day
      const start = isSameDay(date, startDate)
      const end = isSameDay(date, endDate)
      return today && !start && !end
   }

   const isTodayInRange = () => {
      const { day, startDate, endDate } = props
      const { date, today } = day
      const inRange = isWithinRange(date, startDate, endDate)
      return today && inRange
   }

   const range = () => {
      const { day, startDate, endDate } = props
      const { date } = day
      const inRange = isWithinRange(date, startDate, endDate)
      return inRange
   }

   const isOtherMonth = () => {
      const { day } = props
      const { activeMonth } = day
      return !activeMonth
   }

   const getClasses = () => {
      const classes = {
         datePicker__day: true,
         'datePicker__day--selected': isSelected(),
         'datePicker__day--inner': isInnerBound(),
         'datePicker__day--today--range': isTodayInRange(),
         'datePicker__day--today': isOnlyToday(),
         'datePicker__day--range': range(),
         'datePicker__day--outer': isOuterBound(),
         'datePicker__day--otherMonth': isOtherMonth()
      }
      return setClasses(classes)
   }

   const isInactiveBound = (pickedDate) => {
      const { startDate, endDate, activeBound } = props
      const { inner, outer } = activeBound
      const isStartDay = isSameDay(pickedDate, startDate)
      const isEndDay = isSameDay(pickedDate, endDate)
      if (inner && isEndDay) return true
      if (outer && isStartDay) return true
      return false
   }

   const handleClick = (pickedDate) => {
      const {
         activeMonth,
         activeBound,
         rangeSelection,
         atChange,
         setOuterMonth,
         startDate,
         endDate,
         updateActiveBound
      } = props
      const { inner, outer } = activeBound
      const outOfBoundsMonth = !isSameMonth(pickedDate, activeMonth)

      if (rangeSelection) {
         let dates = []
         const switchActiveBound = isInactiveBound(pickedDate)

         if (switchActiveBound) {
            updateActiveBound('switch')
         } else if (inner) {
            if (pickedDate > endDate) dates = [endDate, pickedDate]
            else dates = [pickedDate, endDate]
         } else if (outer) {
            if (pickedDate < startDate) dates = [pickedDate, startDate]
            else dates = [startDate, pickedDate]
         }
         atChange(dates)
      } else {
         atChange(pickedDate)
      }

      if (outOfBoundsMonth) setOuterMonth(pickedDate)
   }

   return (
      <div className={getClasses()} onClick={() => handleClick(date)}>
         {date.getDate()}
      </div>
   )
}

export default Day
