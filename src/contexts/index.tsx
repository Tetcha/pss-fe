import * as React from 'react';
import { LoadingProvider } from './LoadingContext';
import { ModalProvider } from './ModalContext';
import { TableUtilProvider } from './TableUtilContext';

interface ContextsProps extends React.PropsWithChildren {}

export const Contexts: React.FunctionComponent<ContextsProps> = ({ children }) => {
	return (
		<>
			<ModalProvider>
				<TableUtilProvider>
					<LoadingProvider>{children}</LoadingProvider>
				</TableUtilProvider>
			</ModalProvider>
		</>
	);
};
