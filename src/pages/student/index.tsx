import React from 'react';
import { useRouter } from 'next/router';

import { StudentWrapper } from 'src/components/wrappers/studentWrapper';

interface StudentPageProps {}

const StudentPage: React.FunctionComponent<StudentPageProps> = () => {
	const router = useRouter();
	React.useEffect(() => {
		router.push('/student/me');
	}, []);
	return (
		<>
			<StudentWrapper></StudentWrapper>
		</>
	);
};

export default StudentPage;
