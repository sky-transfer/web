import { lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Home = lazy(() => import('./routes/home'));
const App = lazy(() => import('./routes/app'));

export default function Router() {
	const location = useLocation();

	return (
		<>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					key={location.pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.2,
					}}
				>
					<Routes location={location}>
						<Route path='/'>
							<Route index element={<Home />} />
							<Route path='app' element={<App />} />
						</Route>
					</Routes>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
