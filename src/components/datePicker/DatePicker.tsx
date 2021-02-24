import React, { useState, useEffect } from 'react';
import Weekdays from './Weekdays';
import Month from './Month';
import Controls from './Controls';
import '../../style/datePicker.scss';
import { ActivateBound, Bounds } from '../../interfaces';

export interface DatePickerProps {
	startDate: Date;
	rangeSelection: boolean;
	endDate: Date;
	atChange: (dates: Date | [Date, Date]) => void;
}

const Datepicker: React.FC<DatePickerProps> = ({
	startDate,
	rangeSelection,
	endDate,
	atChange
}) => {
	const [activeMonth, setActiveMonth] = useState<Date>(startDate);
	const [activeBound, setActiveBound] = useState<Bounds>({
		inner: false,
		outer: false
	});

	useEffect(() => {
		setActiveMonth(startDate);
	}, [startDate]);

	useEffect(() => {
		if (rangeSelection)
			setActiveBound((activeBound) => ({ ...activeBound, outer: true }));
		else setActiveBound({ inner: false, outer: false });
	}, [rangeSelection]);

	const updateActiveBound = (value: ActivateBound) => {
		if (value === ActivateBound.INNER)
			setActiveBound({ inner: true, outer: false });
		if (value === ActivateBound.OUTER)
			setActiveBound({ inner: false, outer: true });
		if (value === ActivateBound.SWITCH)
			setActiveBound((currentState) => ({
				inner: !currentState.inner,
				outer: !currentState.outer
			}));
	};

	return (
		<div className="datePicker">
			<Controls
				traverseMonth={(date) => setActiveMonth(date)}
				activeMonth={activeMonth}
			/>
			<Weekdays />
			<Month
				rangeSelection={rangeSelection}
				startDate={startDate}
				endDate={endDate}
				atChange={atChange}
				activeMonth={activeMonth}
				setOuterMonth={(date) => setActiveMonth(date)}
				activeBound={activeBound}
				updateActiveBound={updateActiveBound}
			/>
		</div>
	);
};

export default Datepicker;
