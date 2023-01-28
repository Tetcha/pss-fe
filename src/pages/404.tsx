import * as React from 'react';

import { NotFound } from 'src/components/Error';

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
	return (
		<NotFound
			detail="Please check the URL in the address bar and try again. "
			statusCode="404"
			title="Page not found"
		/>
	);
};

export default NotFoundPage;
