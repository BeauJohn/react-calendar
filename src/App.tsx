import './style/App.scss';
import React, { useState } from 'react';
import DatePicker from './components/datePicker/DatePicker';
import DateInput from './components/DateInput';
import Switcher from './components/Switcher';

interface AppProps {}

const App: React.FC<AppProps> = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [range, setRange] = useState(false);

	const handleChange = (date: Date | [Date, Date]) => {
		if (Array.isArray(date)) {
			const [start, end] = date;
			setStartDate(start);
			setEndDate(end);
		} else {
			setStartDate(date);
		}
	};

	const toggleRange = () => {
		setEndDate(startDate);
		setRange((range) => !range);
	};

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
						rangeSelection={range}
					/>
				) : (
					<DatePicker
						rangeSelection={range}
						startDate={startDate}
						endDate={startDate}
						atChange={handleChange}
					/>
				)}
				<Switcher toggle={toggleRange}>{'End date'}</Switcher>
			</div>
		</div>
	);
};

export default App;
