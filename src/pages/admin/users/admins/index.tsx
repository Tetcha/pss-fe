import * as React from 'react';
import { NextPage } from 'next';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import { AdminListFilter } from 'src/interface/admin';
import AdminList from 'src/screens/Admin/Users/AdminList';
import { objectHelper } from 'src/utils';
import { defaultPagingProps } from 'src/models/interface';

interface AdminListPageProps {
	filters: Partial<AdminListFilter>;
}

const AdminListPage: NextPage<AdminListPageProps> = ({ filters }) => {
	return (
		<AdminWrapper>
			<TableUtilProvider>
				<AdminList filters={filters} />
			</TableUtilProvider>
		</AdminWrapper>
	);
};

AdminListPage.getInitialProps = async (ctx): Promise<AdminListPageProps> => {
	return {
		filters: objectHelper.getObjectWithDefault<Partial<AdminListFilter>>(ctx.query, {
			...defaultPagingProps,
			name: '',
			username: '',
		}),
	};
};

export default AdminListPage;
