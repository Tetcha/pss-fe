import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import { logout } from 'src/api/student/auth';
import { ROUTES_URL } from 'src/constants/routes';
import { useStoreUser } from 'src/store';
import { Menu, Transition } from '@headlessui/react';

interface NavigationProps {}

const NAV_LINK = [
	{ label: 'Home', link: '/' },
	{ label: 'About Us', link: '/about' },
	// { label: 'Service', link: '/service' },
	// { label: 'Contact Us', link: '#contact' },
];

export const Navigation: React.FunctionComponent<NavigationProps> = () => {
	const router = useRouter();
	const [visible, setVisible] = React.useState<boolean>(true);
	React.useEffect(() => {}, [router]);
	const handleLogout = () => {
		logout();
		// router.push(ROUTES_URL.HOME);
		window.location.reload();
	};

	const { id, name, avatar } = useStoreUser();
	return (
		<nav className="bg-gray-50 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed z-50 w-full shadow-md">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
				<Link href={ROUTES_URL.HOME} className="flex items-center">
					<LazyLoadImage
						src="/assets/images/logo/pss_logo.png"
						className="h-6 mr-3 sm:h-9"
						alt="Pss Logo"
					/>
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						PSYCH
					</span>
				</Link>
				<div className="flex items-center lg:order-2">
					{!id ? (
						<Link
							href={ROUTES_URL.STUDENT_LOGIN}
							className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 bg-blue-500"
						>
							Login
						</Link>
					) : (
						// <div className="flex items-center justify-center gap-4">
						// 	<Link
						// 		href={ROUTES_URL.HOME}
						// 		onClick={handleLogout}
						// 		className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 bg-blue-500"
						// 	>
						// 		Log out
						// 	</Link>
						// </div>
						<>
							<h1 className="my-1 ml-1 text-base font-bold leading-8 text-gray-800">{name}</h1>
							<Menu as="div" className="relative">
								<Menu.Button
									className={
										'flex justify-center items-center gap-2 cursor-pointer border-none rounded-md'
									}
								>
									<div className="flex text-sm rounded-full">
										<span className="sr-only">Open user menu</span>
										<LazyLoadImage
											className="w-8 h-8 rounded-full"
											src={
												avatar
													? avatar
													: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=32`
											}
											alt=""
										/>
									</div>
								</Menu.Button>
								<Transition
									as={React.Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<Menu.Item>
											{({ active }) => (
												<Link
													href={ROUTES_URL.STUDENT_ME}
													className={`${
														active ? 'bg-gray-100' : ''
													} block px-4 py-2 text-sm text-gray-700`}
												>
													Your Profile
												</Link>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<Link
													href={ROUTES_URL.STUDENT_BALANCE}
													className={`${
														active ? 'bg-gray-100' : ''
													} block px-4 py-2 text-sm text-gray-700`}
												>
													Balance
												</Link>
											)}
										</Menu.Item>
										{/* <Menu.Item>
											{({ active }) => (
												<a
													href="#"
													className={`${
														active ? 'bg-gray-100' : ''
													} block px-4 py-2 text-sm text-gray-700`}
												>
													Settings
												</a>
											)}
										</Menu.Item> */}
										<Menu.Item>
											{({ active }) => (
												<a
													className={`${
														active ? 'bg-gray-100' : ''
													} block px-4 py-2 text-sm text-gray-700`}
													onClick={handleLogout}
												>
													Sign out
												</a>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</>
					)}
					<button
						onClick={() => setVisible(!visible)}
						data-collapse-toggle="mobile-menu-2"
						type="button"
						className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg cursor-pointer lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="mobile-menu-2"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						{visible ? (
							<Bars3Icon className="block w-6 h-6" aria-hidden="true" />
						) : (
							<XMarkIcon className="block w-6 h-6" aria-hidden="true" />
						)}
					</button>
				</div>
				<div
					className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
						visible ? 'hidden' : ''
					}`}
					id="mobile-menu-2"
				>
					<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
						{NAV_LINK.map((item) => (
							<Link
								key={item.label}
								href={item.link}
								className={`${
									router.pathname === item.link || router.pathname == `#${item.link}`
										? 'block py-2 pr-4 pl-3 text-blue-500 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'
										: 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
								}`}
							>
								{item.label}
							</Link>
						))}
						{id ? (
							<Link
								href={ROUTES_URL.DOCTORS}
								className={`${
									router.pathname === '/doctors'
										? 'block py-2 pr-4 pl-3 text-blue-500 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'
										: 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
								}`}
							>
								Doctors
							</Link>
						) : (
							<></>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
