import React from 'react';
import { ActivateBound, Classes, DayObject } from '../../interfaces';
import { isWithinRange, isSameDay, isSameMonth, setClasses } from '../_utils';
import { MonthProps } from './Month';

interface DayProps extends MonthProps {
	day: DayObject;
}

const Day: React.FC<DayProps> = ({
	day,
	activeBound,
	startDate,
	endDate,
	rangeSelection,
	updateActiveBound,
	atChange,
	setOuterMonth,
	activeMonth
}) => {
	const { isCurrentMonth, date, today } = day;

	const isSelected = () => {
		const selectedDay = isSameDay(date, startDate);
		const sameAsStart = isSameDay(startDate, endDate);
		return (selectedDay && sameAsStart) || (selectedDay && !rangeSelection);
	};

	const isInnerBound = () => {
		const selectedDay = isSameDay(date, startDate);
		const sameAsStart = isSameDay(startDate, endDate);
		return selectedDay && rangeSelection && !sameAsStart;
	};

	const isOuterBound = () => {
		const selectedDay = isSameDay(date, endDate);
		const sameAsStart = isSameDay(startDate, endDate);
		return selectedDay && rangeSelection && !sameAsStart;
	};

	const isOnlyToday = () => {
		const start = isSameDay(date, startDate);
		const end = isSameDay(date, endDate);
		return today && !start && !end;
	};

	const isTodayInRange = () => {
		const inRange = isWithinRange(date, startDate, endDate);
		return today && inRange && rangeSelection;
	};

	const range = () => {
		const inRange = isWithinRange(date, startDate, endDate);
		return inRange && rangeSelection;
	};

	const isOtherMonth = () => {
		return !isCurrentMonth;
	};

	const isActive = () => {
		return (
			(activeBound.inner && isInnerBound()) ||
			(activeBound.outer && isOuterBound())
		);
	};

	const isInactiveBound = (pickedDate: Date) => {
		const { inner, outer } = activeBound;
		const isStartDay = isSameDay(pickedDate, startDate);
		const isEndDay = isSameDay(pickedDate, endDate);
		if (inner && isEndDay) return true;
		if (outer && isStartDay) return true;
		return false;
	};

	const getClasses = () => {
		const classes: Classes = {
			datePicker__day: true,
			'datePicker__day--selected': isSelected(),
			'datePicker__day--inner': isInnerBound(),
			'datePicker__day--today--range': isTodayInRange(),
			'datePicker__day--today': isOnlyToday(),
			'datePicker__day--range': range(),
			'datePicker__day--outer': isOuterBound(),
			'datePicker__day--otherMonth': isOtherMonth(),
			'datePicker__day--activeBound': isActive()
		};
		return setClasses(classes);
	};

	const setRanges = (pickedDate: Date) => {
		const { inner, outer } = activeBound;
		const switchActiveBound = isInactiveBound(pickedDate);
		let dates: [Date, Date] = [startDate, endDate];

		if (switchActiveBound === false) {
			if (inner) {
				if (pickedDate > endDate) {
					updateActiveBound(ActivateBound.OUTER);
					dates = [endDate, pickedDate];
				} else {
					dates = [pickedDate, endDate];
				}
			} else if (outer) {
				if (pickedDate < startDate) {
					updateActiveBound(ActivateBound.INNER);
					dates = [pickedDate, startDate];
				} else {
					dates = [startDate, pickedDate];
				}
			}
			atChange(dates);
		} else {
			updateActiveBound(ActivateBound.SWITCH);
		}
	};

	const handleClick = (pickedDate: Date) => {
		const outOfBoundsMonth = !isSameMonth(pickedDate, activeMonth);

		if (outOfBoundsMonth) setOuterMonth(pickedDate);
		if (rangeSelection) setRanges(pickedDate);
		else atChange(pickedDate);
	};

	return (
		<div className={getClasses()} onClick={() => handleClick(date)}>
			{date.getDate()}
		</div>
	);
};

export default Day;
