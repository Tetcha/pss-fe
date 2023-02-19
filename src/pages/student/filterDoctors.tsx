import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';

interface FilterDoctorsProps {}

const FilterDoctors: React.FunctionComponent<FilterDoctorsProps> = () => {
	return (
		<>
			<StudentWrapper>
				<div className="py-4 md:flex md:items-center md:justify-between">Filter Page</div>
			</StudentWrapper>
		</>
	);
};

export default FilterDoctors;
