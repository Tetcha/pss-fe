import Link from 'next/link';
import * as React from 'react';
import { ROUTES_URL } from 'src/constants/routes';
import { useStoreUser } from 'src/store';

interface OurPriceProps {}

const OurPrice: React.FunctionComponent<OurPriceProps> = () => {
	const { id } = useStoreUser();
	return (
		<>
			<section className="relative px-4 flex justify-center items-center">
				<div className="flex flex-col lg:flex-row lg:-mx-8 justify-center items-center max-w-container">
					<div className="w-full lg:px-8">
						<h2 className="text-3xl leading-tight font-bold mt-4">
							Simple, Transparent Pricing for Everyone
						</h2>
						<p className="mt-2 leading-relaxed">
							Aenean ut tellus tellus. Suspendisse potenti. Nullam tincidunt lacus tellus, sed
							aliquam est vehicula a. Pellentesque consectetur condimentum nulla, eleifend
							condimentum purus vehicula in. Donec convallis sollicitudin facilisis. Integer nisl
							ligula, accumsan non tincidunt ac, imperdiet in enim. Donec efficitur ullamcorper
							metus, eu venenatis nunc. Nam eget neque tempus, mollis sem a, faucibus mi.
						</p>
					</div>
					<div className="w-full md:max-w-md md:mx-auto lg:px-8 mt-12 mt:md-0">
						<div className="relative z-10 w-full max-w-md my-8 bg-white rounded-lg shadow-lg sm:my-5">
							<div className="py-4 text-sm font-semibold leading-none tracking-wide text-center text-white uppercase bg-indigo-500 rounded-t">
								Our Price
							</div>
							<div className="block max-w-sm px-8 mx-auto mt-5 text-sm text-left text-black sm:text-md lg:px-6">
								<h3 className="p-3 pb-1 text-lg font-bold tracking-wide text-center uppercase">
									Pro<span className="ml-2 font-light">Plan</span>
								</h3>
								<h4 className="flex items-center justify-center pb-6 text-4xl font-bold text-center text-gray-900">
									{(100000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}/h
								</h4>
								<p className="text-sm text-gray-600 text-center">
									Our most popular package is the Pro Plan which gives you access to the following:
								</p>
							</div>
							<div className="flex justify-start pl-12 mt-8 sm:justify-start">
								<ul>
									<li className="flex items-center">
										<div className="p-2 text-green-500 rounded-full fill-current">
											<svg
												className="w-6 h-6 align-middle"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
												<polyline points="22 4 12 14.01 9 11.01" />
											</svg>
										</div>
										<span className="ml-3 text-lg text-gray-700">Always Devoted</span>
									</li>
									<li className="flex items-center">
										<div className="p-2 text-green-500 rounded-full fill-current ">
											<svg
												className="w-6 h-6 align-middle"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
												<polyline points="22 4 12 14.01 9 11.01" />
											</svg>
										</div>
										<span className="ml-3 text-lg text-gray-700">Always Beside You</span>
									</li>
									<li className="flex items-center">
										<div className="p-2 text-green-500 rounded-full fill-current ">
											<svg
												className="w-6 h-6 align-middle"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
												<polyline points="22 4 12 14.01 9 11.01" />
											</svg>
										</div>
										<span className="ml-3 text-lg text-gray-700">Always Available</span>
									</li>
								</ul>
							</div>
							<div className="flex items-center p-8 uppercase">
								<Link
									href={id ? ROUTES_URL.DOCTORS : ROUTES_URL.STUDENT_LOGIN}
									className="block w-full px-6 py-4 mt-3 text-lg font-semibold text-center text-white bg-gray-900 rounded shadow-sm hover:bg-indigo-600"
								>
									Book Now
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OurPrice;
