import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrappers from './wrappers';
import LogoText from './components/LogoText';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
	const [fontLoading, setFontLoading] = useState(true);
	const [pageLoading, setPageLoading] = useState(true);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// wait for the font to load
		document.fonts.ready.then(() => {
			setTimeout(() => {
				setFontLoading(false);
			}, 100);
		});
	}, []);

	useEffect(() => {
		console.log(fontLoading, pageLoading);
		if (!fontLoading && !pageLoading) {
			setTimeout(() => {
				setLoading(false);
			}, 100);
		}
	}, [fontLoading, pageLoading]);

	const LoadingComponent = () => {
		return (
			<div className='h-screen w-full bg-[#111] grid place-items-center'>
				<div className='w-3/4 md:w-1/2 lg:w-1/4 h-auto'>
					<LogoText />
				</div>
			</div>
		);
	};

	const SuspenseLoadingComponent = () => {
		useEffect(() => {
			return () => setPageLoading(false);
		}, []);

		return <div className='h-screen w-full bg-[#111]' />;
	};

	return (
		<>
			{!fontLoading && (
				<Suspense fallback={<SuspenseLoadingComponent />}>
					<BrowserRouter>
						<Wrappers />
					</BrowserRouter>
				</Suspense>
			)}
			<AnimatePresence initial={false}>
				{loading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						className='z-[690]'
					>
						<LoadingComponent />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
