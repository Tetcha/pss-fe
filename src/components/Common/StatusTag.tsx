import { Tag } from 'antd';
import * as React from 'react';

interface StatusTagProps {
	value: string;
	icon?: React.ReactNode;
}

const StatusTag: React.FunctionComponent<StatusTagProps> = ({ value, icon = <></> }) => {
	const color = () => {
		switch (value) {
			case 'Active':
				return 'success';
			case 'Inactive':
				return 'error';
			default:
				return 'default';
		}
	};

	return (
		<Tag icon={icon} color={color()}>
			{value}
		</Tag>
	);
};

export default StatusTag;
