import { NextPage } from 'next';
import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';
import { BookingHistoryListFilter } from 'src/interface/booking';
import { BookingSlotStatus } from 'src/models/booking';
import { defaultPagingProps } from 'src/models/interface';
import StudentProfile from 'src/screens/Student/Profile';
import { objectHelper } from 'src/utils';

interface StudentPageProps {
	filters: BookingHistoryListFilter;
}

const StudentPage: NextPage<StudentPageProps> = ({ filters }) => {
	return (
		<StudentWrapper>
			<StudentProfile filters={filters} />
		</StudentWrapper>
	);
};

StudentPage.getInitialProps = async (ctx): Promise<StudentPageProps> => {
	return {
		filters: objectHelper.getObjectWithDefault<Partial<BookingHistoryListFilter>>(ctx.query, {
			...defaultPagingProps,
			id: '',
		}),
	};
};

export default StudentPage;
