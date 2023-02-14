import { NextPage } from 'next';
import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
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
			<TableUtilProvider>
				<StudentList filters={filters} />
			</TableUtilProvider>
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
