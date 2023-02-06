import * as React from 'react';

interface ChardCardProps extends React.PropsWithChildren {}

const ChardCard: React.FunctionComponent<ChardCardProps> = ({ children }) => {
	return (
		<div className="flex items-center justify-center p-4 bg-white rounded-md shadow-lg">
			{children}
		</div>
	);
};

export default ChardCard;
