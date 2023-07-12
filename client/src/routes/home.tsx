import { useEffect, useRef, useState } from 'react';
import Banner from '../components/Banner';
import {
	IconBrandDocker,
	IconBrandGithub,
	IconBrandReact,
	IconBrandReactNative,
	IconCode,
	IconDeviceDesktop,
	IconLock,
	IconRocket,
} from '@tabler/icons-react';

export default function Home() {
	const [enableBg, setEnableBg] = useState(false);
	const mainComponent = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mainComponent.current) return;
		mainComponent.current.addEventListener('scroll', onScroll);

		function onScroll() {
			if (mainComponent.current!.scrollTop > window.innerHeight / 3) {
				setEnableBg(true);
			} else {
				setEnableBg(false);
			}
		}

		return () => {
			mainComponent.current!.removeEventListener('scroll', onScroll);
		};
	}, [mainComponent.current]);

	return (
		<div
			className='bg-[#111111] text-white min-h-screen overflow-x-hidden max-h-screen max-w-full overflow-y-visible'
			ref={mainComponent}
		>
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
			<div className='bg-[#222222]'></div>
		</div>
	);
}
