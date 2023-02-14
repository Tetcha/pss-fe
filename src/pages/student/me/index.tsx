import * as React from 'react';

interface StudentProps {}

const Student: React.FunctionComponent<StudentProps> = () => {
	return (
		<div className="flex w-full h-screen justify-center items-center">
			<h1>Student</h1>
		</div>
	);
};
export default Student;
