import { NextPage } from 'next';

import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';
import { BookingHistoryListFilter } from 'src/interface/booking';
import { defaultPagingProps } from 'src/models/interface';
import StudentBalance from 'src/screens/Student/Balance';
import { objectHelper } from 'src/utils';

interface StudentBalancePageProps {}

const StudentBalancePage: NextPage<StudentBalancePageProps> = () => {
	return (
		<StudentWrapper>
			<StudentBalance />
		</StudentWrapper>
	);
};

export default StudentBalancePage;
