import React from 'react';
import { FormatOptions } from '../../interfaces';
import { format, addMonth } from '../_utils';

interface ControlsProps {
	activeMonth: Date;
	traverseMonth: (date: Date) => void;
}

enum Direction {
	BACK = -1,
	FORWARD = 1
}

const Controls: React.FC<ControlsProps> = ({ activeMonth, traverseMonth }) => {
	const options: FormatOptions = { month: 'long', year: 'numeric' };
	const locale = 'en-US';
	const notation = format(activeMonth, options, locale);

	const traverse = (n: Direction) => {
		const date = addMonth(activeMonth, n);
		traverseMonth(date);
	};

	return (
		<div className="datePicker__monthControl">
			<div className="datePicker__month">{notation}</div>
			<div className="datePicker__buttons">
				<button
					className="monthControl__prev monthControl__button"
					onClick={() => traverse(Direction.BACK)}
				></button>
				<button
					className="monthControl__next monthControl__button"
					onClick={() => traverse(Direction.FORWARD)}
				></button>
			</div>
		</div>
	);
};

export default Controls;
