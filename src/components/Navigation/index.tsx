import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { routes } from '../routes';

interface NavigationProps {}

const NAV_LINK = [
	{ label: 'Home', link: '/' },
	{ label: 'About Us', link: '/about' },
	{ label: 'Service', link: '/service' },
	{ label: 'Contact Us', link: '/contact' },
];

export const Navigation: React.FunctionComponent<NavigationProps> = () => {
	const router = useRouter();
	// const [popUp, setPopUp] = React.useState<boolean>(false);
	// const OnLogout = async () => {
	// 	const res = await logout();
	// 	if (res) window.location.reload();
	// };
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-container px-2 sm:px-4 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex px-2 lg:px-0 justify-between w-full">
								<Link href={routes.homeUrl} legacyBehavior>
									<div className="flex flex-shrink-0 items-center">
										<LazyLoadImage
											className="block w-full h-full"
											src="./assets/images/logo/logo.png"
											alt="Logo"
										/>
									</div>
								</Link>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{NAV_LINK.map((item) => (
										<Link href={item.link} key={item.label} legacyBehavior>
											<a
												className={`${
													router.pathname === item.link
														? 'border-indigo-500 text-gray-900'
														: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
												} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 `}
											>
												{item.label}
											</a>
										</Link>
									))}
								</div>
							</div>

							<div className="flex items-center lg:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="lg:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{NAV_LINK.map((item) => (
								<Link legacyBehavior key={item.label} href={item.link}>
									<Disclosure.Button
										as="a"
										className={`block py-2 pl-3 pr-4 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 ${
											router.pathname === item.link &&
											'bg-indigo-50 border-indigo-500 text-indigo-700 capitalize'
										}`}
									>
										{item.label}
									</Disclosure.Button>
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
