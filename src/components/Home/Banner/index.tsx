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
		// <section className="flex justify-center w-full mt-[60px]">
		// 	<div className="w-full max-w-6xl">
		// 		<Swiper
		// 			spaceBetween={30}
		// 			modules={[Navigation]}
		// 			// autoplay={{
		// 			// 	delay: 5000,
		// 			// 	disableOnInteraction: false,
		// 			// }}
		// 			navigation={{
		// 				prevEl: navigationPrevRef.current,
		// 				nextEl: navigationNextRef.current,
		// 			}}
		// 			className="mySwiper"
		// 		>
		// 			{sliderItem.map((item) => (
		// 				<SwiperSlide key={`slider-${item.id}}`} className="w-full h-full">
		// 					<LazyLoadImage
		// 						src={item.image}
		// 						alt={item.image}
		// 						className="w-full h-[600px] object-cover overflow-hidden"
		// 					/>
		// 				</SwiperSlide>
		// 			))}
		// 			<div
		// 				ref={navigationPrevRef}
		// 				className="absolute z-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full opacity-75 cursor-pointer h-9 w-9 left-8 sm:left-20 top-1/2"
		// 			>
		// 				<span>
		// 					<ChevronLeftIcon className="w-6 h-6 text-gray-3" />
		// 				</span>
		// 			</div>
		// 			<div
		// 				ref={navigationNextRef}
		// 				className="absolute z-10 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full opacity-75 cursor-pointer right-8 sm:right-20 h-9 w-9 top-1/2"
		// 			>
		// 				<span className="">
		// 					<ChevronRightIcon className="w-6 h-6 text-gray-3" />
		// 				</span>
		// 			</div>
		// 		</Swiper>
		// 	</div>
		// </section>

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
						<h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
							A better life starts with a beautiful smile.
						</h1>
						<p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">
							Welcome to the Psych Support System, where trust and comfort are priorities.
						</p>
						<Link
							href={id ? ROUTES_URL.DOCTORS : ROUTES_URL.STUDENT_LOGIN}
							className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold text-lg"
						>
							Book Appointment
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};
