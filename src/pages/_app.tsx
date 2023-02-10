import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';
import 'swiper/css';
import 'swiper/css/bundle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DynamicLayout } from 'src/components/Layouts/DynamicLayout';
import { Contexts } from 'src/contexts';
import { store } from 'src/store';

import 'antd/dist/antd.css';
import '../styles/globals.css';
// import '../styles/output.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<>
			<Provider store={store}>
				<NextSeo
					title={'PSYCH'}
					description={'description go here'}
					openGraph={{
						images: [
							{
								url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
								width: 1000,
								height: 700,
								alt: 'PSYCH',
							},
							{
								url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
								width: 1000,
								height: 700,
								alt: 'PSYCH',
							},
						],
					}}
				/>
				<QueryClientProvider client={queryClient}>
					<Contexts>
						<DynamicLayout>
							<div className="relative w-full h-auto">
								<Component {...pageProps} />
							</div>
						</DynamicLayout>
						<ToastContainer />
					</Contexts>
				</QueryClientProvider>
			</Provider>
		</>
	);
}
