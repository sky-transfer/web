import { useEffect, useRef, useState } from 'react';
import Banner from '../components/Banner';
import {
	IconBrandDocker,
	IconBrandGithub,
	IconBrandReact,
	IconCode,
	IconDeviceDesktop,
	IconDeviceMobile,
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
			<div className='bg-[#222222]'>
				<div className='container mx-auto p-2'>
					<div className='grid grid-cols-3 grid-rows-2 gap-4 w-full h-full'>
						<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
							<IconRocket className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>Start fast</h2>
							<p className='opacity-80'>
								To get started, simply scan a QR Code on a device
							</p>
						</div>
						<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
							<IconLock className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>No data storage</h2>
							<p className='opacity-80'>
								We don't store any but the required data
							</p>
						</div>
						<div className='row-span-2 p-8 bg-[#333] border-white border-opacity-10 border rounded-lg flex flex-col justify-center h-full group'>
							<IconCode className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>We're open source!</h2>
							<p className='opacity-80'>
								We use open source software and we're open source too! Both our
								apps and our server are open source, so you can check them out
								on our GitHub page. Feel free to contribute to this project!
							</p>
						</div>
						<div className='col-span-2 h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
							<IconDeviceDesktop className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>Cross-Platform</h2>
							<p className='opacity-80 w-3/4'>
								Just because of the web interface alone, you can use Sky
								Transfer on any device you like!
								<br /> We have built our own Android app too, so you can use it
								on your phone more easily
							</p>
						</div>
						<div className='col-span-3 gap-4 grid grid-cols-4'>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconBrandReact className='text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>Built with React</h2>
								<p className='opacity-80 w-3/4'>
									We use React for our web interface
								</p>
							</div>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconDeviceMobile className='text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>... and React Native</h2>
								<p className='opacity-80 w-3/4'>
									We use React Native for our mobile app
								</p>
							</div>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconBrandGithub className='text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>Hosted on GitHub</h2>
								<p className='opacity-80 w-3/4'>
									We use GitHub for our source code management
								</p>
							</div>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconBrandDocker className='text-[#ccf] group-hover:drop-shadow-glow transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>Running with Docker</h2>
								<p className='opacity-80 w-3/4'>
									Under the hood, we use Docker to run our server. This makes
									our server more secure and easier to deploy
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
