import * as React from 'react';

import { AdminWrapper } from 'src/components/wrappers/adminWrapper';
import Transaction from 'src/screens/Admin/Transaction';

interface TransactionPageProps {}

const TransactionPage: React.FunctionComponent<TransactionPageProps> = () => {
	return (
		<AdminWrapper>
			<Transaction />
		</AdminWrapper>
	);
};

export default TransactionPage;
