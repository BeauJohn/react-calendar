import React, { useState, useEffect, useRef } from 'react';
import { format, validDate, setClasses } from './_utils';
import '../style/dateInput.scss';
import { Classes, FormatOptions } from '../interfaces';

interface DateInputProps {
	date: Date;
	atChange: (x: Date) => void;
	multiple: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ date, atChange, multiple }) => {
	const [currentDate, setCurrentDate] = useState('');
	const [newDate, setNewDate] = useState('');
	const [invalidDate, setInvalidDate] = useState(false);
	const [focus, setFocus] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const classes: Classes = {
		dateInput: true,
		'dateInput--invalid': invalidDate,
		'dateInput--focus': focus
	};

	useEffect(() => {
		const options: FormatOptions = {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		};
		const locale = 'en-US';
		const notation = format(date, options, locale);
		setCurrentDate(notation);
		setNewDate(notation);
	}, [date]);

	const updateDate = (e: React.FocusEvent<HTMLInputElement>) => {
		const isValidDate = validDate(date);
		if (isValidDate) {
			const date = new Date(newDate);
			setFocus(false);
			setInvalidDate(false);
			atChange(date);
		}
		if (newDate === '') setNewDate(currentDate);
		else if (!validDate(new Date(newDate))) setInvalidDate(true);
	};

	const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputRef.current !== null) {
			inputRef.current.blur();
		}
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (multiple) {
			setFocus((focus) => !focus);
		}
	};

	return (
		<div className={setClasses(classes)}>
			<input
				type="text"
				readOnly
				ref={inputRef}
				value={newDate}
				onChange={(e) => setNewDate(e.target.value)}
				onBlur={updateDate}
				onKeyPress={(e) => onEnter(e)}
				onFocus={handleFocus}
			/>
		</div>
	);
};

export default DateInput;
