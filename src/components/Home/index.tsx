import { FunctionComponent } from 'react';
import Banner from './Banner2';

// import { Banner } from './Banner';
import Introduce from './Introduce';
import OurDoctors from './OurDoctors';
import OurPrice from './Price';
import Schedule from './Schedule';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<div className="flex flex-col justify-center w-full gap-y-10 pb-10 px-5 2xl:px-0">
			<Banner />
			<Introduce />
			<OurPrice />
			<OurDoctors />
		</div>
	);
};

export default Home;
