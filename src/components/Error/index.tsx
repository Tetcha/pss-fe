import Link from 'next/link';

interface NotFoundProps {
	statusCode: string;
	title: string;
	detail: string;
}

export const NotFound: React.FunctionComponent<NotFoundProps> = ({ detail, statusCode, title }) => {
	return (
		<div className="min-h-full px-4 py-16 bg-white sm:px-6 sm:py-24 md:place-items-center lg:px-8">
			<div className="mx-auto max-w-max">
				<main className="sm:flex">
					<p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">{statusCode}</p>
					<div className="sm:ml-6">
						<div className="sm:border-l sm:border-gray-200 sm:pl-6">
							<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
								{title}
							</h1>
							<p className="mt-1 text-base text-gray-500">{detail}</p>
						</div>
						<div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
							<Link href="/">
								<div className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Go back home
								</div>
							</Link>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
