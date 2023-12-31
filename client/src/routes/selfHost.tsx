import { AnimatePresence, motion } from 'framer-motion';
import { textContainer, textItem } from '../components/Banner';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { IconCheck, IconClipboard } from '@tabler/icons-react';
import Footer from '../components/Footer';

const Codeblock = (props: { content: string }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;

		setTimeout(() => {
			setCopied(false);
		}, 1500);
	}, [copied]);

	return (
		<p className='p-4 bg-[#222] rounded-lg flex flex-row justify-between'>
			<p className='font-mono select-all'>{props.content}</p>
			{!copied ? (
				<IconClipboard
					className='opacity-50 hover:opacity-100 active:scale-95 transition-all duration-100'
					onClick={() => {
						navigator.clipboard.writeText(props.content);
						setCopied(true);
					}}
				/>
			) : (
				<IconCheck className='text-[#ccf]' />
			)}
		</p>
	);
};

export default function selfHost() {
	const [navDetach, setNavDetach] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const mainComponent = useRef<HTMLDivElement>(null);

	const [port, setPort] = useState('3000');

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
			<Navbar navDetach={navDetach} />
			<div className='h-screen bg-gradient-to-br from-[#5A5AD6] to-[#3333CD]'>
				<AnimatePresence>
					<motion.div
						variants={textContainer}
						initial='hidden'
						animate='show'
						className='grid place-items-center h-full text-center'
					>
						<div
							className='flex flex-col gap-4'
							style={{
								transform: `translateY(${
									scrollY < window.innerHeight
										? scrollY / 3
										: window.innerHeight / 3
								}px)`,
							}}
						>
							<motion.h1
								variants={textItem}
								className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'
							>
								Self hosting docs
							</motion.h1>
							<motion.p
								variants={textItem}
								className='text-xl md:text-2xl lg:text-3xl'
							>
								Host your own Sky Transfer Server
							</motion.p>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className='min-h-screen bg-[#333] py-8 p-4'>
				<div className='flex flex-col gap-8 container mx-auto w-full h-full'>
					<div>
						<h1>1. Install Docker</h1>
						<div>
							If you haven't already, install Docker. You can find a guide{' '}
							<a
								href='https://docs.docker.com/engine/install/#server'
								target='_blank'
								className='underline text-[#ccf] hover:text-white transition-colors duration-100'
							>
								here
							</a>
							.
						</div>
					</div>
					<div>
						<h1>2. Pull the image</h1>
						<p>
							The self-hosted image is available on the GitHub Container
							Registry (or ghcr for short). You can pull the image by running
							this command:
						</p>
						<div className='my-4' />
						<Codeblock content='docker pull ghcr.io/sky-transfer/web:prod' />
					</div>
					<div>
						<h1>3. Run the container!</h1>
						<div className='my-4' />
						<p className='opacity-80'>Enter your port</p>
						<div className='my-2' />
						<input
							type='text'
							className='w-full p-4 rounded-lg bg-[#222] focus:outline-none placeholder:text-white placeholder:opacity-50'
							placeholder='3000'
							value={port}
							onChange={(e) => setPort(e.target.value)}
						/>
						<div className='my-4' />
						<p className='opacity-80'>Command</p>
						<div className='my-2' />
						<Codeblock
							content={`docker run -p ${port}:3000 -d --restart=always --name sky-transfer ghcr.io/sky-transfer/web:prod`}
						/>

						<div className='my-4' />
						<p className='text-[#ccf] text-xl'>No volumes?</p>
						<div className='my-2' />
						<p>
							As we don't store any data, we don't need a volume! It's very
							straight forward.
						</p>
					</div>
					<div>
						<h1>Updating</h1>
						<div className='my-2' />
						<p>
							There's a new update? No problem! Here's how you can update your
							container:
						</p>

						<div className='my-4' />

						<Codeblock content='docker stop sky-transfer' />
						<div className='my-2' />
						<Codeblock content='docker rm sky-transfer' />
						<div className='my-2' />
						<Codeblock content='docker pull ghcr.io/sky-transfer/web:prod' />
						<div className='my-2' />
						<Codeblock
							content={`docker run -p ${port}:3000 -d --restart=always --name sky-transfer ghcr.io/sky-transfer/web:prod`}
						/>
					</div>
					<div>
						<h1>Uninstalling</h1>
						<div className='my-2' />
						<p>
							If you're done using Sky Transfer and want to uninstall it, here's
							how:
						</p>

						<div className='my-4' />

						<Codeblock content='docker stop sky-transfer' />
						<div className='my-2' />
						<Codeblock content='docker rm sky-transfer' />
						<div className='my-2' />
						<Codeblock content='docker rmi ghcr.io/sky-transfer/web:prod' />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
