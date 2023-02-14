import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import { logout } from 'src/api/auth';
import { constant } from 'src/constants/api/token';
import { ROUTES_URL } from 'src/constants/routes';
import { store } from 'src/store';
import { useStoreUser } from 'src/store';

interface NavigationProps {}

const NAV_LINK = [
	{ label: 'Home', link: '/' },
	{ label: 'About Us', link: '/about' },
	{ label: 'Service', link: '/service' },
	{ label: 'Contact Us', link: '#contact' },
];

export const Navigation: React.FunctionComponent<NavigationProps> = () => {
	const router = useRouter();
	const [visible, setVisible] = React.useState<boolean>(true);
	const user = useStoreUser();
	React.useEffect(() => {});
	const handleLogout = async () => {
		logout();
		window.location.reload();
	};

	return (
		<header>
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed z-10 w-full">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<Link href={ROUTES_URL.HOME} className="flex items-center">
						<LazyLoadImage
							src="https://flowbite.com/docs/images/logo.svg"
							className="mr-3 h-6 sm:h-9"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							PSYCH
						</span>
					</Link>
					<div className="flex items-center lg:order-2">
						{!user.id ? (
							<Link
								href={ROUTES_URL.STUDENT_LOGIN}
								className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 bg-blue-500"
							>
								Log in
							</Link>
						) : (
							<div className="flex justify-center items-center gap-4">
								<h3 className="block pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
									Hello {user.name}
								</h3>
								<Link
									href={ROUTES_URL.HOME}
									onClick={handleLogout}
									className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 bg-blue-500"
								>
									Log out
								</Link>
							</div>
						)}
						<button
							onClick={() => setVisible(!visible)}
							data-collapse-toggle="mobile-menu-2"
							type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer"
							aria-controls="mobile-menu-2"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{visible ? (
								<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
							) : (
								<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
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
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};
