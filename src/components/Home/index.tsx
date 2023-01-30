import { FunctionComponent } from 'react';

import { Navigation } from '../Navigation';
import { Banner } from './Banner';
import Introduce from './Introduce';
import Schedule from './Schedule';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<>
			<Navigation />
			<Banner />
			<Introduce />
			<Schedule />
		</>
	);
};

export default Home;
