import { Classes, DayObject, FormatOptions } from '../interfaces';

export function getDaysInMonth(date: Date) {
	if (!validDate(date)) {
		return 'Invalid Date';
	}
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	return new Date(year, month, 0).getDate();
}

export function getStartOfMonth(date: Date) {
	return new Date(date.setDate(1));
}

export function addDays(date: Date, n: number) {
	const days = n > 0 ? Math.floor(n) : Math.ceil(n);
	const day = date.getDate();
	const nDate = new Date(date);
	nDate.setDate(day + days);
	return nDate;
}

export function addMonth(date: Date, n: number) {
	const months = n > 0 ? Math.floor(n) : Math.ceil(n);
	const month = date.getMonth();
	const nDate = new Date(date);
	nDate.setDate(1);
	nDate.setMonth(month + months);
	return nDate;
}

export function addYears(date: Date, n: number) {
	const years = n > 0 ? Math.floor(n) : Math.ceil(n);
	const year = date.getFullYear();
	const nDate = new Date(date);
	nDate.setFullYear(year + years);
	return nDate;
}

export function isSameDay(dateLeft: Date, dateRight: Date | undefined) {
	if (!dateRight) return false;
	const timeLeft = new Date(dateLeft);
	const timeRight = new Date(dateRight);
	timeLeft.setHours(0, 0, 0, 0);
	timeRight.setHours(0, 0, 0, 0);
	return timeLeft.toString() === timeRight.toString();
}

export function isThisMonth(date: Date) {
	const currentdate = new Date();
	return isSameMonth(currentdate, date);
}

export function format(date: Date, format: FormatOptions, locale: string) {
	if (!validDate(date) || typeof format !== 'object') {
		return 'Invalid Date';
	} else if (locale && typeof locale !== 'string') {
		return 'Invalid locale';
	}
	const nDate = new Date(date);
	return nDate.toLocaleDateString(locale, format);
}

export function isToday(date: Date) {
	const today = new Date();
	const day = new Date(date);
	return isSameDay(today, day);
}

export function validDate(date: Date) {
	const valid = new Date(date);
	if (Object.prototype.toString.call(valid) === '[object Date]') {
		if (isNaN(valid.getTime())) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

export function isSameMonth(dateLeft: Date, dateRight: Date) {
	const yearLeft = dateLeft.getFullYear();
	const yearRight = dateRight.getFullYear();
	const monthLeft = dateLeft.getMonth();
	const monthRight = dateRight.getMonth();
	return yearLeft === yearRight && monthLeft === monthRight;
}

export function isBeforeDate(pickedDate: Date, currentDate: Date) {
	return pickedDate < currentDate;
}

export function isAfterDate(pickedDate: Date, currentDate: Date) {
	return pickedDate > currentDate;
}

export function isWithinRange(
	date: Date,
	startDate: Date,
	endDate: Date | number = 0
) {
	return startDate < date && date < endDate;
}

export function getMonthCalendar(date: Date) {
	let nDate = new Date(date);
	const today = new Date();
	const arr: DayObject[] = [];
	const days = 42;
	const firstDayMonth = getStartOfMonth(nDate);
	const startWeekdayMonth = firstDayMonth.getDay();
	const startDayMonth = 1;
	const startOfCalendar = startDayMonth - startWeekdayMonth;

	nDate.setDate(startOfCalendar);

	for (let i = 0; i < days; i++) {
		const object: DayObject = {
			date: nDate,
			isCurrentMonth: isSameMonth(nDate, date),
			today: false
		};
		arr.push(object);
		nDate = addDays(nDate, 1);
	}

	if (isSameMonth(date, today)) {
		const i = today.getDate() + startWeekdayMonth - 1;
		arr[i].today = true;
	}

	return arr;
}

export const setClasses = (classes: Classes) => {
	const arr: string[] = [];
	for (const [key, value] of Object.entries(classes)) {
		if (value === true) arr.push(key);
	}
	return arr.join(' ').trim();
};
