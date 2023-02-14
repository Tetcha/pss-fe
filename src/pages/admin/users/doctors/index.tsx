import { NextPage } from 'next';
import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import { DoctorListFilter } from 'src/interface/doctor';
import { defaultPagingProps } from 'src/models/interface';
import DoctorList from 'src/screens/Admin/Users/DoctorList';
import { objectHelper } from 'src/utils';

interface DoctorListPageProps {
	filters: DoctorListFilter;
}

const DoctorListPage: NextPage<DoctorListPageProps> = ({ filters }) => {
	return (
		<AdminWrapper>
			<TableUtilProvider>
				<DoctorList filters={filters} />
			</TableUtilProvider>
		</AdminWrapper>
	);
};

DoctorListPage.getInitialProps = async (ctx): Promise<DoctorListPageProps> => {
	return {
		filters: objectHelper.getObjectWithDefault<Partial<DoctorListFilter>>(ctx.query, {
			...defaultPagingProps,
			name: '',
			username: '',
			phone: '',
		}),
	};
};

export default DoctorListPage;
