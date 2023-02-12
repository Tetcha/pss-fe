import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import {
	DribbbleOutlined,
	FacebookFilled,
	GithubOutlined,
	InstagramFilled,
	TwitterOutlined,
	UserOutlined,
} from '@ant-design/icons';

import { ROUTES_URL } from 'src/constants/routes';
interface FooterProps {}

export const Footer: React.FunctionComponent<FooterProps> = () => {
	return (
		<footer className="p-4 bg-gray-50 sm:p-6 dark:bg-gray-800">
			<div className="mx-auto max-w-screen-xl">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a href="https://flowbite.com" className="flex items-center">
							<LazyLoadImage
								src="https://flowbite.com/docs/images/logo.svg"
								className="mr-3 h-8"
								alt="FlowBite Logo"
							/>
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								PSYCH
							</span>
						</a>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 text-black">
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Information
							</h2>
							<ul className="text-gray-600 dark:text-gray-400 list-none pl-0">
								<li className="mb-4">
									<a href="https://flowbite.com" className="hover:underline text-black">
										PSYCH
									</a>
								</li>
								<li>
									<a href="https://tailwindcss.com/" className="hover:underline text-black">
										Tailwind CSS
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Follow us
							</h2>
							<ul className="text-gray-600 dark:text-gray-400 list-none pl-0">
								<li className="mb-4">
									<a
										href="https://github.com/themesberg/flowbite"
										className="hover:underline text-black"
									>
										Github
									</a>
								</li>
								<li>
									<a href="https://discord.gg/4eeurUVvTy" className="hover:underline text-black">
										Discord
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Legal
							</h2>
							<ul className="text-gray-600 dark:text-gray-400 list-none pl-0">
								<li className="mb-4">
									<a href="#" className="hover:underline text-black">
										Privacy Policy
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline text-black">
										Terms &amp; Conditions
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Account
							</h2>
							<ul className="text-gray-600 dark:text-gray-400 list-none pl-0">
								<li className="mb-4">
									<Link href={ROUTES_URL.ADMIN_LOGIN} className="hover:underline text-black">
										<UserOutlined className="text-gray-500 hover:text-gray-900 dark:hover:text-white pr-1" />
										Admin
									</Link>
								</li>
								<li>
									<Link href={ROUTES_URL.DOCTOR_LOGIN} className="hover:underline text-black">
										<UserOutlined className="text-gray-500 hover:text-gray-900 dark:hover:text-white pr-1" />
										Doctors
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8  h-0 border-t-px text-inherit m-0" />
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2022 PSYCH™ . All Rights Reserved.
					</span>
					<div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
						<a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
							<FacebookFilled type="message" style={{ fontSize: '20px', color: '#333' }} />
						</a>
						<a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
							<InstagramFilled type="message" style={{ fontSize: '20px', color: '#333' }} />
						</a>
						<a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
							<TwitterOutlined type="message" style={{ fontSize: '20px', color: '#333' }} />
						</a>
						<a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
							<GithubOutlined type="message" style={{ fontSize: '20px', color: '#333' }} />
						</a>
						<a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
							<DribbbleOutlined type="message" style={{ fontSize: '20px', color: '#333' }} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
