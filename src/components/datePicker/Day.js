import React from 'react'
import {
   isBeforeDate,
   isAfterDate,
   isWithinRange,
   isSameDay,
   isSameMonth,
   setClasses
} from '../_utils'

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

   const range = (params) => {
      const { day, startDate, endDate } = props
      const { date } = day
      const inRange = isWithinRange(date, startDate, endDate)
      return inRange
   }

   const isOtherMonth = (params) => {
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

   /* const getPickedDates = (date, rangeSelection) => {
      if (rangeSelection) {
         //check for same day, or inner or outer 
         // switch if neccesary 
         // depending on active state return new array

      } else if (!rangeSelection) {
         return date
      }
   } */

   /* const handleClick = (pickedDate) => {
      const outOfBoundsMonth = !isSameMonth(pickedDate, activeMonth)
      const dates = getPickedDates(pickedDate, rangeSelection)
      /*if (outOfBoundsMonth) setOuterMonth(pickedDate)
      atChange(dates)
          let dates = []
         const isBeforeStart = isBeforeDate(pickedDate, startDate)
         const isAfterEnd = isAfterDate(pickedDate, endDate)
         const isBetweenStartAndEnd = isWithinRange(
            pickedDate,
            startDate,
            endDate
         )

         if (isBeforeStart) {
            dates = [pickedDate, endDate]
         } else if (isBetweenStartAndEnd) {
            dates = [startDate, pickedDate]
         } else if (isAfterEnd) {
            dates = [startDate, pickedDate]
         } 
      }
   }  */

   return (
      <div className={getClasses()} onClick={() => handleClick(date)}>
         {date.getDate()}
      </div>
   )
}

export default Day
