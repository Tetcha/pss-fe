import { FunctionComponent } from 'react';

import { Navigation } from '../Navigation';
import { Banner } from './Banner';
import Introduce from './Introduce';
import Schedule from './Schedule';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div className="flex flex-col justify-center w-full">
			<Navigation />
			<Banner />
			<Introduce />
			<Schedule />
		</div>
	);
};

export default Home;
