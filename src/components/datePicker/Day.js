import React from 'react'
import { isWithinRange, isSameDay, isSameMonth, setClasses } from '../_utils'

function Day(props) {
   const { date } = props.day

   const isSelected = () => {
      const { day, startDate, endDate } = props
      const { date } = day
      const selectedDay = isSameDay(date, startDate)
      const sameAsStart = isSameDay(startDate, endDate)
      return selectedDay && sameAsStart
   }

   const isInnerBound = () => {
      const { day, rangeSelection, startDate, endDate } = props
      const { date } = day
      const selectedDay = isSameDay(date, startDate)
      const sameAsStart = isSameDay(startDate, endDate)
      return selectedDay && rangeSelection && !sameAsStart
   }

   const isOuterBound = () => {
      const { day, rangeSelection, startDate, endDate } = props
      const { date } = day
      const selectedDay = isSameDay(date, endDate)
      const sameAsStart = isSameDay(startDate, endDate)
      return selectedDay && rangeSelection && !sameAsStart
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
      const { isCurrentMonth } = day
      return !isCurrentMonth
   }

   const isActive = () => {
      const { activeBound } = props
      return (
         (activeBound.inner && isInnerBound()) ||
         (activeBound.outer && isOuterBound())
      )
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

   const getClasses = () => {
      const classes = {
         datePicker__day: true,
         'datePicker__day--selected': isSelected(),
         'datePicker__day--inner': isInnerBound(),
         'datePicker__day--today--range': isTodayInRange(),
         'datePicker__day--today': isOnlyToday(),
         'datePicker__day--range': range(),
         'datePicker__day--outer': isOuterBound(),
         'datePicker__day--otherMonth': isOtherMonth(),
         'datePicker__day--activeBound': isActive()
      }
      return setClasses(classes)
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

         if (!switchActiveBound) {
            if (inner) {
               if (pickedDate > endDate) {
                  updateActiveBound('outer')
                  dates = [startDate, pickedDate]
               } else {
                  dates = [pickedDate, endDate]
               }
            } else if (outer) {
               if (pickedDate < startDate) {
                  updateActiveBound('inner')
                  dates = [pickedDate, endDate]
               } else {
                  dates = [startDate, pickedDate]
               }
            }
            atChange(dates)
         } else {
            updateActiveBound('switch')
         }
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
