import * as React from 'react';
import { Tag } from 'antd';

import { UserStatus } from 'src/models/user';
import { isBoolean } from 'lodash';

interface StatusTagProps {
	value: string | boolean | UserStatus;
	icon?: React.ReactNode;
}

const StatusTag: React.FunctionComponent<StatusTagProps> = ({ value, icon = <></> }) => {
	const color = () => {
		switch (value) {
			case true:
				return 'success';
			case false:
				return 'error';
			case UserStatus.ACTIVE:
				return 'success';
			case UserStatus.INACTIVE:
				return 'error';
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
			{isBoolean(value) ? (value ? 'Active' : 'Inactive') : value}
		</Tag>
	);
};

export default StatusTag;
