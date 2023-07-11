import { useEffect, useState } from 'react';
import Banner from '../components/Banner';

export default function Home() {
	const [enableBg, setEnableBg] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);

		function onScroll() {
			if (window.scrollY > window.innerHeight / 3) {
				setEnableBg(true);
			} else {
				setEnableBg(false);
			}
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<div className='bg-[#111111] text-white min-h-screen overflow-x-hidden'>
			<div
				className={`h-16 w-full bg-[#111] backdrop-blur-sm ${
					enableBg ? 'bg-opacity-25' : 'bg-opacity-0'
				} fixed top-0 left-0 p-2 flex z-50 transition-all duration-100`}
			>
				<p className='uppercase text-2xl my-auto font-black tracking-widest'>
					Skytransfer
				</p>
			</div>
			<Banner />
			<div className='bg-[#121212]'>
				<div className='mx-auto container p-2'>
					<div className='grid lg:grid-cols-2'>
						{/* pin it to the top */}
						<div className='sticky top-0 left-0'>
							<div className='bg-[#222] rounded-lg p-4'>
								<h1 className='text-2xl font-bold'>What is Sky Transfer?</h1>
							</div>
						</div>
						<div className='h-screen'></div>
						<div className='h-screen'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
