import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// Import Swiper styles
import 'swiper/css/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	return (
		<section className="flex justify-center w-full">
			<div className="w-full max-w-6xl">
				<Swiper
					spaceBetween={30}
					modules={[Navigation]}
					// autoplay={{
					// 	delay: 5000,
					// 	disableOnInteraction: false,
					// }}
					navigation={{
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					className="mySwiper"
				>
					{sliderItem.map((item) => (
						<SwiperSlide key={`slider-${item.id}}`} className="w-full h-full">
							<LazyLoadImage
								src={item.image}
								alt={item.image}
								className="w-full h-[600px] object-cover overflow-hidden"
							/>
						</SwiperSlide>
					))}
					<div
						ref={navigationPrevRef}
						className="absolute z-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full opacity-75 cursor-pointer h-9 w-9 left-8 sm:left-20 top-1/2"
					>
						<span>
							<ChevronLeftIcon className="w-6 h-6 text-gray-3" />
						</span>
					</div>
					<div
						ref={navigationNextRef}
						className="absolute z-10 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full opacity-75 cursor-pointer right-8 sm:right-20 h-9 w-9 top-1/2"
					>
						<span className="">
							<ChevronRightIcon className="w-6 h-6 text-gray-3" />
						</span>
					</div>
				</Swiper>
			</div>
		</section>
	);
};
