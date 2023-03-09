import Link from 'next/link';
import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ROUTES_URL } from 'src/constants/routes';
import { useStoreUser } from 'src/store';

interface BannerProps {}

const Banner: React.FunctionComponent<BannerProps> = () => {
	const { id } = useStoreUser();
	return (
		<>
			<div className="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
				<div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
					<div className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
						<h1 className="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-5xl xl:mb-8 capitalize">
							Your mental health matters
						</h1>
						<p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">
							Welcome to the Psych Support System, where trust and comfort are priorities.
						</p>
						<div className="flex gap-4">
							<Link
								href={id ? ROUTES_URL.DOCTORS : ROUTES_URL.STUDENT_LOGIN}
								className="px-6 py-4 bg-blue-600 text-white rounded inline-block mt-8 font-semibold text-lg"
							>
								Book Appointment
							</Link>
							<a
								href="#"
								className="px-6 py-4 bg-blue-600 text-white rounded inline-block mt-8 font-semibold text-lg"
							>
								Download Now
							</a>
						</div>
						{/* Integrates with section */}
						<div className="flex-col hidden mt-12 sm:flex lg:mt-24">
							<p className="mb-4 text-sm font-medium tracking-widest text-gray-700 uppercase">
								Integrates With
							</p>
							<div className="flex">
								<svg
									className="h-8 mr-4 text-gray-500 duration-150 cursor-pointer fill-current transition-color hover:text-gray-600"
									viewBox="0 0 2350 2315"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g stroke="none" strokeWidth={1} />
									<g>
										<path d="M1175 0C525.8 0 0 525.8 0 1175c0 552.2 378.9 1010.5 890.1 1139.7-5.9-14.7-8.8-35.3-8.8-55.8v-199.8H734.4c-79.3 0-152.8-35.2-185.1-99.9-38.2-70.5-44.1-179.2-141-246.8-29.4-23.5-5.9-47 26.4-44.1 61.7 17.6 111.6 58.8 158.6 120.4 47 61.7 67.6 76.4 155.7 76.4 41.1 0 105.7-2.9 164.5-11.8 32.3-82.3 88.1-155.7 155.7-190.9-393.6-47-581.6-240.9-581.6-505.3 0-114.6 49.9-223.3 132.2-317.3-26.4-91.1-61.7-279.1 11.8-352.5 176.3 0 282 114.6 308.4 143.9 88.1-29.4 185.1-47 284.9-47 102.8 0 196.8 17.6 284.9 47 26.4-29.4 132.2-143.9 308.4-143.9 70.5 70.5 38.2 261.4 8.8 352.5 82.3 91.1 129.3 202.7 129.3 317.3 0 264.4-185.1 458.3-575.7 499.4 108.7 55.8 185.1 214.4 185.1 331.9V2256c0 8.8-2.9 17.6-2.9 26.4C2021 2123.8 2350 1689.1 2350 1175 2350 525.8 1824.2 0 1175 0z" />
									</g>
								</svg>
								<svg
									className="h-8 mr-4 text-gray-500 duration-150 cursor-pointer fill-current transition-color hover:text-gray-600"
									viewBox="0 0 680 680"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g stroke="none" strokeWidth={1}>
										<g transform="translate(-401 -701)">
											<g transform="translate(-293 -236)">
												<g transform="translate(463 909)">
													<g transform="translate(0 28)">
														<g transform="translate(229.885)">
															<path d="M242.088 0c-36.478.027-66 29.582-65.973 66-.027 36.418 29.522 65.973 66 66h66V66.027C308.142 29.608 278.593.054 242.088 0c.027 0 .027 0 0 0zm.23 175H66.912c-36.365.027-65.824 29.576-65.797 65.987-.054 36.41 29.405 65.96 65.77 66.013h175.433c36.366-.027 65.824-29.576 65.797-65.987.027-36.437-29.431-65.986-65.797-66.013zM681.115 240.987c.027-36.411-29.522-65.96-66-65.987-36.478.027-66.027 29.576-66 65.987V307h66c36.478-.027 66.027-29.576 66-66.013zm-175 .214V65.772C506.142 29.506 476.614.054 440.13 0c-36.486.027-66.04 29.48-66.014 65.772v175.429c-.054 36.293 29.501 65.745 65.987 65.799 36.485-.027 66.04-29.48 66.013-65.8zM440.115 680c36.478-.027 66.027-29.582 66-66 .027-36.418-29.522-65.973-66-66h-66v66c-.027 36.392 29.522 65.946 66 66zm-.23-175h175.433c36.366-.027 65.824-29.576 65.797-65.987.054-36.41-29.404-65.96-65.77-66.013H439.912c-36.366.027-65.824 29.576-65.797 65.987-.027 36.437 29.405 65.986 65.77 66.013zM1.115 439c-.027 36.418 29.522 65.973 66 66 36.478-.027 66.027-29.582 66-66v-66h-66c-36.478.027-66.027 29.582-66 66zm175-.249v175.444c-.054 36.296 29.501 65.751 65.987 65.805 36.485-.027 66.04-29.482 66.013-65.778V438.805c.054-36.296-29.501-65.751-65.986-65.805-36.513 0-66.04 29.455-66.014 65.751 0 0 0 .027 0 0z" />
														</g>
													</g>
												</g>
											</g>
										</g>
									</g>
								</svg>
							</div>
						</div>
						<svg
							className="absolute left-0 max-w-md mt-24 -ml-64 left-svg -z-50"
							viewBox="0 0 423 423"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<defs>
								<linearGradient x1="100%" y1="0%" x2="4.48%" y2="0%" id="linearGradient-1">
									<stop stopColor="#40a9ff" offset="0%" />
									<stop stopColor="#6A82E7" offset="100%" />
								</linearGradient>
								<filter
									x="-9.3%"
									y="-6.7%"
									width="118.7%"
									height="118.7%"
									filterUnits="objectBoundingBox"
									id="filter-3"
								>
									<feOffset dy={8} in="SourceAlpha" result="shadowOffsetOuter1" />
									<feGaussianBlur
										stdDeviation={8}
										in="shadowOffsetOuter1"
										result="shadowBlurOuter1"
									/>
									<feColorMatrix
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
										in="shadowBlurOuter1"
									/>
								</filter>
								<rect id="path-2" x={63} y={504} width={300} height={300} rx={40} />
							</defs>
							<g
								id="Page-1"
								stroke="none"
								strokeWidth={1}
								fill="none"
								fillRule="evenodd"
								opacity=".9"
							>
								<g id="Desktop-HD" transform="translate(-39 -531)">
									<g id="Hero" transform="translate(43 83)">
										<g id="Rectangle-6" transform="rotate(45 213 654)">
											<use fill="#000" filter="url(#filter-3)" xlinkHref="#path-2" />
											<use fill="url(#linearGradient-1)" xlinkHref="#path-2" />
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div className="relative z-40 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
						<div className="container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
							<LazyLoadImage
								src="/assets/images/banner/banner.jpg"
								className="w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12 border-[1px] border-solid border-gray-300 rounded-lg"
								alt="banner"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
