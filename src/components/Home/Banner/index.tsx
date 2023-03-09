import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// Import Swiper styles
import 'swiper/css/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { useStoreUser } from 'src/store';
import { ROUTES_URL } from 'src/constants/routes';

interface BannerProps {}
const sliderItem = [
	{
		id: 1,
		image: '/assets/images/banner/banner.jpg',
	},
	{
		id: 2,
		image: '/assets/images/banner/banner1.jpg',
	},
	{
		id: 3,
		image: '/assets/images/banner/banner2.jpg',
	},
	{
		id: 4,
		image: '/assets/images/banner/banner3.jpg',
	},
];

export const Banner: React.FunctionComponent<BannerProps> = () => {
	const { id } = useStoreUser();
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	return (
		<div className="bg-gray-100">
			<section className="cover bg-blue-teal-gradient relative bg-blue-400 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex items-center min-h-screen">
				<div className="h-full absolute top-0 left-0 z-0">
					<LazyLoadImage
						src="/assets/images/banner/banner.jpg"
						alt=""
						className="w-full h-full object-cover opacity-20"
					/>
				</div>
				<div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
					<div>
						<h1 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
							Your mental health matters. Get the support you need with our support system.
						</h1>
						<p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">
							Welcome to the Psych Support System, where trust and comfort are priorities.
						</p>
						<div className="flex gap-4">
							<Link
								href={id ? ROUTES_URL.DOCTORS : ROUTES_URL.STUDENT_LOGIN}
								className="px-6 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold text-lg"
							>
								Book Appointment
							</Link>
							<Link
								href={id ? ROUTES_URL.DOCTORS : ROUTES_URL.STUDENT_LOGIN}
								className="px-6 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold text-lg"
							>
								Download Now
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
