import { NextPage } from 'next';
import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import { StudentListFilter } from 'src/interface/student';
import { defaultPagingProps } from 'src/models/interface';
import StudentList from 'src/screens/Admin/Users/StudentList';
import { objectHelper } from 'src/utils';

interface StudentListPageProps {
	filters: StudentListFilter;
}

const StudentListPage: NextPage<StudentListPageProps> = ({ filters }) => {
	return (
		<AdminWrapper>
			<StudentList filters={filters} />
		</AdminWrapper>
	);
};

StudentListPage.getInitialProps = async (ctx): Promise<StudentListPageProps> => {
	return {
		filters: objectHelper.getObjectWithDefault<Partial<StudentListFilter>>(ctx.query, {
			...defaultPagingProps,
			name: '',
			email: '',
			studentCode: '',
			phone: '',
		}),
	};
};

export default StudentListPage;
