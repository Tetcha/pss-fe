import * as React from 'react';
import { Tag } from 'antd';

import { UserStatus } from 'src/models/user';
import { stringHelper } from 'src/utils';
import { BookingSlotStatus } from 'src/models/booking';

interface StatusTagProps {
	value: string | boolean | UserStatus;
	icon?: React.ReactNode;
}

const StatusTag: React.FunctionComponent<StatusTagProps> = ({ value, icon = <></> }) => {
	const color = () => {
		switch (value.toString().toUpperCase()) {
			case 'TRUE':
				return 'success';
			case 'FALSE':
				return 'error';
			case UserStatus.ACTIVE:
				return 'success';
			case UserStatus.INACTIVE:
				return 'error';
			case BookingSlotStatus.REJECTED:
				return 'error';
			case BookingSlotStatus.ACCEPTED:
				return 'success';
			case BookingSlotStatus.PENDING:
				return 'processing';
			case 'ACTIVE':
				return 'success';
			case 'SUCCESS':
				return 'success';
			case 'INACTIVE':
				return 'error';
			case 'FAILED':
				return 'error';
			case 'PENDING':
				return 'processing';
			default:
				return 'default';
		}
	};

	return (
		<Tag icon={icon} color={color()}>
			{typeof value == 'boolean'
				? value
					? 'Active'
					: 'Inactive'
				: stringHelper.capitalizeFirstLetter(value)}
		</Tag>
	);
};

export default StatusTag;
