import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrappers from './wrappers';
import LogoText from './components/LogoText';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
	const [loading, setLoading] = useState(true);
	const [hideBar, setHideBar] = useState(false);

	useEffect(() => {
		// wait for the font to load
		document.fonts.ready.then(() => {
			setTimeout(() => {
				setLoading(false);
				setTimeout(() => {
					setHideBar(true);
				}, 850);
			}, 100);
		});
	}, []);

	const LoadingComponent = () => {
		return (
			<div className='h-screen w-full bg-[#111] grid place-items-center'>
				<div className='w-3/4 md:w-1/2 lg:w-1/4 h-auto'>
					<LogoText />
				</div>
			</div>
		);
	};

	return (
		<>
			<div
				className={`absolute top-0 left-0 h-1 bg-[#ccf] ${
					loading ? 'w-0' : 'w-full'
				} ${
					hideBar ? 'opacity-0' : ''
				} z-[500] transition-all duration-700 ease-[cubic-bezier(.17,.67,.49,.97)]`}
			/>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.3,
					}}
					key={`${loading ? 'loading' : 'not loading'}`}
				>
					{loading ? (
						<LoadingComponent />
					) : (
						<Suspense fallback={<div className='h-screen w-full bg-[#111]' />}>
							<BrowserRouter>
								<Wrappers />
							</BrowserRouter>
						</Suspense>
					)}
				</motion.div>
			</AnimatePresence>
		</>
	);
}
