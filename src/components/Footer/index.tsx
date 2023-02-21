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
			<div className="max-w-screen-xl mx-auto">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a href="https://flowbite.com" className="flex items-center">
							<LazyLoadImage
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8 mr-3"
								alt="FlowBite Logo"
							/>
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								PSYCH
							</span>
						</a>
					</div>
					<div className="grid grid-cols-2 gap-8 text-black sm:gap-6 sm:grid-cols-4">
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Information
							</h2>
							<ul className="pl-0 text-gray-600 list-none dark:text-gray-400">
								<li className="mb-4">
									<a href="https://flowbite.com" className="text-black hover:underline">
										PSYCH
									</a>
								</li>
								<li>
									<a href="https://tailwindcss.com/" className="text-black hover:underline">
										Tailwind CSS
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Follow us
							</h2>
							<ul className="pl-0 text-gray-600 list-none dark:text-gray-400">
								<li className="mb-4">
									<a
										href="https://github.com/themesberg/flowbite"
										className="text-black hover:underline"
									>
										Github
									</a>
								</li>
								<li>
									<a href="https://discord.gg/4eeurUVvTy" className="text-black hover:underline">
										Discord
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Legal
							</h2>
							<ul className="pl-0 text-gray-600 list-none dark:text-gray-400">
								<li className="mb-4">
									<a href="#" className="text-black hover:underline">
										Privacy Policy
									</a>
								</li>
								<li>
									<a href="#" className="text-black hover:underline">
										Terms &amp; Conditions
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Account
							</h2>
							<ul className="pl-0 text-gray-600 list-none dark:text-gray-400">
								<li className="mb-4">
									<Link href={ROUTES_URL.ADMIN_LOGIN} className="text-black hover:underline">
										<UserOutlined className="pr-1 text-gray-500 hover:text-gray-900 dark:hover:text-white" />
										Admin
									</Link>
								</li>
								<li>
									<Link href={ROUTES_URL.DOCTOR_LOGIN} className="text-black hover:underline">
										<UserOutlined className="pr-1 text-gray-500 hover:text-gray-900 dark:hover:text-white" />
										Doctor
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className="h-0 m-0 my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 border-t-px text-inherit" />
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
