import { FunctionComponent } from 'react';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold text-red-500 underline">Hello worldd!</h1>
		</div>
	);
};

export default Home;
