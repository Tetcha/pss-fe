import * as React from 'react';

import { LoadingProvider } from './LoadingContext';
import { ModalProvider } from './ModalContext';

interface ContextsProps extends React.PropsWithChildren {}

export const Contexts: React.FunctionComponent<ContextsProps> = ({ children }) => {
	return (
		<>
			<ModalProvider>
				<LoadingProvider>{children}</LoadingProvider>
			</ModalProvider>
		</>
	);
};
