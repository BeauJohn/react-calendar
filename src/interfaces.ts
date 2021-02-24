export interface Bounds {
	inner: boolean;
	outer: boolean;
}
export interface FormatOptions {
	day?: string;
	month: string;
	year: string;
}

export interface Classes {
	[key: string]: boolean;
}

export interface DayObject {
	date: Date;
	isCurrentMonth: boolean;
	today: boolean;
}

export enum ActivateBound {
	INNER = 'inner',
	OUTER = 'outer',
	SWITCH = 'switch'
}
