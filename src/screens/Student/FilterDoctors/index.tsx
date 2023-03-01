import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import _get from 'lodash.get';

import StatusTag from 'src/components/Common/StatusTag';
import { TableBodyCell, TableBuilder, TableHeaderCell } from 'src/components/Tables';
import { ROUTES_URL } from 'src/constants/routes';
import { getDoctorList } from 'src/api/admin/list';
import { DoctorInfo, DoctorListFilterForStudent } from 'src/interface/doctor';
import { pagingMapper } from 'src/utils/object.helper';
import { useTableUtil } from 'src/contexts/TableUtilContext';
import { Button, Card, Col, Row } from 'antd';
import FormFilterWrapper from 'src/components/Input/FormFilterWrapper';
import { InputSelect, TextField } from 'src/components/Input';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Gender } from 'src/interface/common';
import { useModalContext } from 'src/contexts/ModalContext';
import BookingDoctor from '../Booking/BookingDoctor';
import { Doctor } from 'src/models/doctor';
import BookingCalendar from '../Booking/BookingCalendar';

interface FilterDoctorsProps {
	filters: Partial<DoctorListFilterForStudent>;
}

const FilterDoctors: React.FunctionComponent<FilterDoctorsProps> = ({ filters }) => {
	const { handleModal, handleOpenModal } = useModalContext();
	const { setTotalItem } = useTableUtil();
	const query = useQuery(
		['doctors', filters],
		async () => {
			const { data } = await getDoctorList(pagingMapper(filters));

			setTotalItem(data.count);

			return data;
		},
		{ initialData: { data: [], count: 0 } },
	);

	const openBookingCalendar = (props: Doctor) => {
		handleModal('BookingCalendar', <BookingCalendar doctor={props} />);
		handleOpenModal('BookingCalendar');
	};

	return (
		<div className="flex justify-center flex-col items-center">
			<div className="w-full max-w-container px-2 sm:px-0">
				<div className="flex-1 min-w-0">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Doctors
					</h2>
				</div>
				<div className="py-4 md:flex md:items-center md:justify-between">
					<div className="flex-1 min-w-0">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							Doctors
						</h2>
					</div>
				</div>
				<Row className="flex justify-end pb-4">
					<FormFilterWrapper<DoctorListFilterForStudent>
						defaultValues={{ name: '', gender: '', isActive: '' }}
					>
						<Row className="gap-2">
							<Col>
								<TextField commonField={{ name: 'name', label: 'Name' }} />
							</Col>

							<Col>
								<InputSelect
									commonField={{
										label: 'Gender',
										name: 'gender',
									}}
									options={[
										{ value: Gender.MALE, label: Gender.MALE },
										{ value: Gender.FEMALE, label: Gender.FEMALE },
										{ value: Gender.OTHERS, label: Gender.OTHERS },
									]}
									className="min-w-[100px]"
								/>
							</Col>
							<Col>
								<InputSelect
									commonField={{
										label: 'Activity',
										name: 'isActive',
									}}
									options={[
										{ value: 'true', label: 'ACTIVE' },
										{ value: 'false', label: 'INACTIVE' },
										{ value: '', label: '--' },
									]}
									className="min-w-[110px]"
								/>
							</Col>
						</Row>
					</FormFilterWrapper>
				</Row>
				<TableBuilder
					data={query.data.data}
					columns={[
						{
							title: () => <TableHeaderCell key="avatar" sortKey="avatar" label="Avatar" />,
							key: 'avatar',

							render: ({ ...props }) => {
								return (
									<LazyLoadImage
										key={`${props.id}-${props.name}`}
										src={
											props.avatar ? props.avatar : `https://ui-avatars.com/api/?name=${props.name}`
										}
										className="border-solid border-[0.5px] border-gray-200 
										w-16 md:w-48"
									/>
								);
							},
						},
						{
							title: () => <TableHeaderCell key="name" sortKey="name" label="Name" />,
							key: 'name',

							render: ({ ...props }) => {
								return <TableBodyCell key={`${props.id}-${props.name}`} label={props.name} />;
							},
						},
						{
							title: () => (
								<TableHeaderCell key="briefInfo" sortKey="briefInfo" label="Brief Info" />
							),
							key: 'briefInfo',

							render: ({ ...props }) => {
								return (
									<TableBodyCell key={`${props.id}-${props.briefInfo}`} label={props.briefInfo} />
								);
							},
						},
						{
							title: () => <TableHeaderCell key="gender" sortKey="gender" label="Gender" />,
							key: 'gender',

							render: ({ ...props }) => {
								return <TableBodyCell key={`${props.id}-${props.gender}`} label={props.gender} />;
							},
						},
						{
							title: () => <TableHeaderCell key="active" sortKey="isActive" label="Active" />,
							key: 'status',
							render: ({ ...props }) => {
								return <StatusTag value={props.isActive} key={`${props.id}-${props.status}`} />;
							},
						},
						{
							render: ({ ...props }) => {
								return (
									<div className="flex items-center space-x-4 mt-2">
										{props.isActive ? (
											<Button
												className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100 cursor-pointer border-none"
												onClick={() => openBookingCalendar(props)}
											>
												<span>Book</span>
											</Button>
										) : (
											<></>
										)}
									</div>
								);
							},
						},
					]}
					rowKey="id"
					isLoading={query.isLoading}
				/>
			</div>
		</div>
	);
};

export default FilterDoctors;
