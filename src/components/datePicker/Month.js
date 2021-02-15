import React from 'react';
import { getMonthCalendar } from '../_utils';
import Day from './Day';

function Month(props) {
	const { activeMonth } = props;
	const calendar = getMonthCalendar(activeMonth);

	return (
		<div className="datePicker__body">
			{calendar.map((day, i) => (
				<Day key={i} day={day} {...props} />
			))}
		</div>
	);
}

export default Month;
