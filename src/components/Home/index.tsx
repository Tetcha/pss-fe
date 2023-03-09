import { FunctionComponent } from 'react';

import { Banner } from './Banner';
import Introduce from './Introduce';
import OurPrice from './Price';
import Schedule from './Schedule';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div className="flex flex-col justify-center w-full gap-y-10 pb-10">
			<Banner />
			<Introduce />
			<OurPrice />
		</div>
	);
};

export default Home;
