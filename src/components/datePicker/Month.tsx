import React from 'react';
import { ActivateBound, Bounds } from '../../interfaces';
import { getMonthCalendar } from '../_utils';
import { DatePickerProps } from './DatePicker';
import Day from './Day';

export interface MonthProps extends DatePickerProps {
	activeMonth: Date;
	setOuterMonth: (x: Date) => void;
	activeBound: Bounds;
	updateActiveBound: (x: ActivateBound) => void;
}

const Month: React.FC<MonthProps> = ({
	startDate,
	rangeSelection,
	endDate,
	activeBound,
	atChange,
	updateActiveBound,
	activeMonth,
	setOuterMonth
}) => {
	const calendar = getMonthCalendar(activeMonth);
	return (
		<div className="datePicker__body">
			{calendar.map((day, i) => (
				<Day
					startDate={startDate}
					rangeSelection={rangeSelection}
					endDate={endDate}
					activeBound={activeBound}
					atChange={atChange}
					updateActiveBound={updateActiveBound}
					activeMonth={activeMonth}
					setOuterMonth={setOuterMonth}
					key={i}
					day={day}
				/>
			))}
		</div>
	);
};

export default Month;
