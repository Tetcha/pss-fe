import * as React from 'react';
import { Tag } from 'antd';

interface StatusTagProps {
	value: string;
	icon?: React.ReactNode;
}

const StatusTag: React.FunctionComponent<StatusTagProps> = ({ value, icon = <></> }) => {
	const color = () => {
		switch (value) {
			case 'Active':
				return 'success';
			case 'Success':
				return 'success';
			case 'Inactive':
				return 'error';
			case 'Failed':
				return 'error';
			case 'Pending':
				return 'processing';
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
