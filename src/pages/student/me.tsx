import * as React from 'react';
import { StudentWrapper } from 'src/components/wrappers/studentWrapper';
import StudentProfile from 'src/screens/Student/Profile';

interface StudentProps {}

const Student: React.FunctionComponent<StudentProps> = () => {
	return (
		<StudentWrapper>
			<StudentProfile />
		</StudentWrapper>
	);
};
export default Student;
