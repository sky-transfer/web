import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrappers from './wrappers';
import LogoText from './components/LogoText';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
	const [fontLoading, setFontLoading] = useState(true);
	const [pageLoading, setPageLoading] = useState(true);

	const [loading, setLoading] = useState(true);
	const [hideBar, setHideBar] = useState(false);

	useEffect(() => {
		// wait for the font to load
		document.fonts.ready.then(() => {
			setTimeout(() => {
				setFontLoading(false);
				setTimeout(() => {
					setHideBar(true);
				}, 850);
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
			<div
				className={`absolute top-0 left-0 h-1 bg-[#ccf] ${
					loading ? 'w-0' : 'w-full'
				} ${hideBar ? 'opacity-0' : ''} z-[69]`}
				style={{
					transition:
						'opacity 0.25s linear, width 0.75s cubic-bezier(.17,.67,.49,.97)',
				}}
			/>
			{!fontLoading && (
				<Suspense fallback={<SuspenseLoadingComponent />}>
					<BrowserRouter>
						<Wrappers />
					</BrowserRouter>
				</Suspense>
			)}
			<AnimatePresence mode='wait' initial={false}>
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
