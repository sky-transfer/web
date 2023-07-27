import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Wrappers from './wrappers';

export default function App() {
	return (
		<>
			<Suspense fallback={<div className='h-screen w-full bg-[#111]' />}>
				<BrowserRouter>
					<Wrappers />
				</BrowserRouter>
			</Suspense>
		</>
	);
}
