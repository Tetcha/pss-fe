import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';

interface StudentProps {}

const Student: React.FunctionComponent<StudentProps> = () => {
	return (
		<StudentWrapper>
			<div className="flex w-full h-screen justify-center items-center">
				<h1>Student</h1>
			</div>
		</StudentWrapper>
	);
};
export default Student;
