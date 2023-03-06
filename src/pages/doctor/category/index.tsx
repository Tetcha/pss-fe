import * as React from 'react';
import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import DoctorCategory from 'src/screens/Doctor/DoctorCategory';

interface DoctorCategoryPageProps {}

const DoctorCategoryPage: React.FunctionComponent<DoctorCategoryPageProps> = () => {
	return (
		<DoctorWrapper>
			<TableUtilProvider>
				<DoctorCategory />
			</TableUtilProvider>
		</DoctorWrapper>
	);
};

export default DoctorCategoryPage;
