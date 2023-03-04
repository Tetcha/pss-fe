import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';
import FilterDoctors from 'src/screens/Student/FilterDoctors';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import { DoctorListFilterForStudent } from 'src/interface/doctor';
import { defaultPagingProps } from 'src/models/interface';
import { objectHelper } from 'src/utils';
import { NextPage } from 'next';

interface DoctorsPageProps {
	filters: DoctorListFilterForStudent;
}

const DoctorsPage: NextPage<DoctorsPageProps> = ({ filters }) => {
	return (
		<>
			<StudentWrapper>
				<TableUtilProvider>
					<FilterDoctors filters={filters} />
				</TableUtilProvider>
			</StudentWrapper>
		</>
	);
};

DoctorsPage.getInitialProps = async (ctx): Promise<DoctorsPageProps> => {
	return {
		filters: objectHelper.getObjectWithDefault<Partial<DoctorListFilterForStudent>>(ctx.query, {
			...defaultPagingProps,
			name: '',
			username: '',
			phone: '',
			gender: '',
			isActive: true,
		}),
	};
};

export default DoctorsPage;
