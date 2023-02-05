import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
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
							<div className="flex items-center">
								{/* <div className="hidden lg:ml-4 lg:flex lg:items-center">
									{userState.id ? (
										<Menu as="div" className="relative flex-shrink-0 ml-4">
											<div>
												<Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
													<img
														className="w-8 h-8 rounded-full"
														src={
															userState.imageUrl
																? userState.imageUrl
																: '/asset/images/avatar/default-avatar.png'
														}
														alt="avatar"
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 z-10 w-48 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<div className="flex flex-col font-semibold text-white bg-blue-500 cursor-none">
														<p className={'block px-4 py-2 text-sm  capitalize cursor-pointer '}>
															Hello, {userState.name}
														</p>
													</div>
													{COMMON_ACTION_LINK.map((item) => (
														<Menu.Item key={item.label}>
															{({ active }) => (
																<Link href={item.link}>
																	<a
																		className={classNames(
																			active ? 'bg-gray-100' : '',
																			'block hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm text-gray-700 capitalize',
																		)}
																	>
																		{item.label}
																	</a>
																</Link>
															)}
														</Menu.Item>
													))}
													<Menu.Item>
														{({ active }) => (
															<div
																onClick={() => _onLogout()}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block hover:bg-gray-100 px-4 cursor-pointer py-2 text-sm text-gray-700',
																)}
															>
																Sign out
															</div>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									) : (
										<Link href={routes.loginUrl} passHref>
											<a
												type="button"
												className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												Login
											</a>
										</Link>
									)}
								</div> */}
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
