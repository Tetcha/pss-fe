export interface CommonFieldProps<Key = any> {
	label?: string;
	name: string & keyof Key;
	isRequire?: boolean;
	direction?: Direction;
}

export type Direction = 'row' | 'column';

export interface Option<Label = any, Value = any> {
	label: Label;
	value: Value;
}

export interface OptionExtended<Label = any, Value = any> extends Option<Label, Value> {
	name: string;
}
