import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';
import FilterDoctors from 'src/screens/Student/FilterDoctors';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import { DoctorListFilterForStudent } from 'src/interface/doctor';
import { defaultPagingProps } from 'src/models/interface';
import { objectHelper } from 'src/utils';
import { NextPage } from 'next';

interface FindDoctorsPageProps {
	filters: DoctorListFilterForStudent;
}

const FindDoctorsPage: NextPage<FindDoctorsPageProps> = ({ filters }) => {
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

FindDoctorsPage.getInitialProps = async (ctx): Promise<FindDoctorsPageProps> => {
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

export default FindDoctorsPage;
