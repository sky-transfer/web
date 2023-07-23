import { useEffect, useRef, useState } from 'react';
import Banner from '../components/Banner';
import {
	IconBrandAndroid,
	IconBrandDocker,
	IconBrandGithub,
	IconBrandReact,
	IconCode,
	IconDeviceDesktop,
	IconLink,
	IconLock,
	IconMessage,
	IconRocket,
	IconServer,
	IconWorld,
} from '@tabler/icons-react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const [navDetach, setNavDetach] = useState(false);
	const mainComponent = useRef<HTMLDivElement>(null);
	const whatRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		if (!mainComponent.current) return;
		mainComponent.current.addEventListener('scroll', onScroll);

		function onScroll() {
			setScrollY(mainComponent.current!.scrollTop);
			if (mainComponent.current!.scrollTop > window.innerHeight / 2) {
				setNavDetach(true);
			} else {
				setNavDetach(false);
			}
		}

		return () => {
			mainComponent.current?.removeEventListener('scroll', onScroll);
		};
	}, [mainComponent.current]);

	return (
		<div
			className='bg-[#111111] text-white min-h-screen overflow-x-hidden max-h-screen w-full overflow-y-visible'
			ref={mainComponent}
		>
			<div
				className={`h-16 w-full bg-[#111] border border-white backdrop-blur-sm ${
					navDetach
						? 'bg-opacity-50 rounded-lg m-2 border-opacity-5'
						: 'bg-opacity-0 border-opacity-0'
				} fixed top-0 left-0 w-[calc(100%-20px)] p-4 flex z-50 transition-all duration-200`}
			>
				<p className='uppercase text-2xl my-auto font-black tracking-widest'>
					Skytransfer
				</p>
			</div>
			<Banner scrollY={scrollY} />
			<div
				className='h-screen grid place-items-center text-center relative'
				ref={whatRef}
				id='what'
			>
				<div className='absolute top-8 left-8 flex h-full'>
					<div
						className='my-auto'
						style={{
							transform: `translateY(${
								Math.max(
									scrollY - (whatRef.current?.scrollHeight || 0),
									whatRef.current?.clientHeight || 0,
								) * 0.2
							}px)`,
							filter: `blur(${Math.max(
								5 - (scrollY - (whatRef.current?.scrollHeight || 0)) / 5,
								0,
							)}px)`,
						}}
					>
						<IconMessage size={69} className='text-[#ccf]' />
					</div>
				</div>
				<div className='absolute top-8 right-8 flex h-full'>
					<div
						className='my-auto'
						style={{
							transform: `translateY(${
								Math.max(
									scrollY - (whatRef.current?.scrollHeight || 0),
									whatRef.current?.clientHeight || 0,
								) * -0.1
							}px)`,
							filter: `blur(${Math.max(
								5 - (scrollY - (whatRef.current?.scrollHeight || 0)) / 5,
								0,
							)}px)`,
						}}
					>
						<IconLink size={69} className='text-[#ccf]' />
					</div>
				</div>
				<h3
					className='text-3xl lg:text-5xl -tracking-wider'
					style={{
						transform: `translateY(${
							Math.min(
								scrollY - (whatRef.current?.scrollHeight || 0),
								whatRef.current?.clientHeight || 0,
							) * -0.25
						}px)`,
						filter: `drop-shadow(0px 0px ${
							Math.min(scrollY - (whatRef.current?.scrollHeight || 0), 36) * 0.1
						}px #ccf)`,
					}}
				>
					Sky Transfer is a tool for
					<br />
					sharing text between two devices
				</h3>
			</div>
			<div className='bg-[#222222]'>
				<div className='container mx-auto p-2'>
					<div
						className='grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 w-full h-full'
						id='features'
					>
						<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
							<IconRocket className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>Start fast</h2>
							<p className='opacity-80'>
								To get started, simply scan a QR Code on a device
							</p>
						</div>
						<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
							<IconLock className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>No data storage</h2>
							<p className='opacity-80'>
								We don't store any but the required data
							</p>
						</div>
						<div className='lg:row-span-2 p-8 bg-[#333] border-white border-opacity-10 border rounded-lg flex flex-col justify-center h-full group'>
							<IconCode className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>We're open source!</h2>
							<p className='opacity-80'>
								We use open source software and we're open source too! Both our
								apps and our server are open source, so you can check them out
								on our GitHub page. Feel free to contribute to this project!
							</p>
						</div>
						<div className='lg:col-span-2 h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
							<IconDeviceDesktop className='w-12 h-auto text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100' />
							<div className='my-2' />
							<h2 className='text-xl'>Cross-Platform</h2>
							<p className='opacity-80 w-3/4'>
								Just because of the web interface alone, you can use Sky
								Transfer on any device you like!
								<br /> We have built our own Android app too, so you can use it
								on your phone more easily
							</p>
						</div>
						<div className='lg:col-span-3 gap-4 grid grid-cols-1 lg:grid-cols-4'>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconBrandReact className='text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>Built with React</h2>
								<p className='opacity-80 w-3/4'>
									We use React for our web interface and React Native for our
									mobile app
								</p>
							</div>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconBrandGithub className='text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>Hosted on GitHub</h2>
								<p className='opacity-80 w-3/4'>
									We use GitHub for our source code management and for our CD
								</p>
							</div>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconBrandDocker className='text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>Running with Docker</h2>
								<p className='opacity-80 w-3/4'>
									Under the hood, we use Docker to run our server. This makes
									our server more secure and easier to deploy
								</p>
							</div>
							<div className='h-full p-8 bg-[#333] border-white border-opacity-10 border rounded-lg text-left flex flex-col items-start justify-center group'>
								<IconServer className='text-[#ccf] group-hover:drop-shadow-glow-small transition-all duration-100 w-12 h-auto' />
								<div className='my-2' />
								<h2 className='text-xl'>
									Self-host{' '}
									<span className='opacity-50 text-[#ccf]'>(coming soon!)</span>
								</h2>
								<p className='opacity-80 w-3/4'>
									We provide a Docker image for you to host your own Sky
									Transfer server
								</p>
							</div>
						</div>
					</div>
					<div className='my-16' />
					<div
						className='flex flex-row items-center gap-8 text-center'
						id='start'
					>
						<div className='w-full h-px flex-1 bg-white opacity-10' />
						<p className='text-[#ccf] text-2xl flex flex-row gap-2 hover:drop-shadow-glow-small transition-all duration-100'>
							<IconRocket className='my-auto' />
							<span className='my-auto font-bold'>Let's get started!</span>
						</p>
						<div className='w-full h-px flex-1 bg-white opacity-10' />
					</div>
					<div className='my-8' />
					<div className='flex flex-row gap-4 items-center justify-center'>
						<button
							className='btn-primary flex flex-row gap-4 font-bold'
							onClick={() => {
								navigate('/app');
							}}
						>
							<IconWorld />
							Web Interface
						</button>
						<button
							onClick={() => open('/download/android', '_blank')}
							className='btn-secondary flex flex-row gap-4 font-bold'
						>
							<IconBrandAndroid /> Android App
						</button>
					</div>
					<br />
				</div>
				<Footer />
			</div>
		</div>
	);
}
