import { AnimatePresence, motion } from 'framer-motion';
import { textContainer, textItem } from '../components/Banner';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';

export default function selfHost() {
	const [navDetach, setNavDetach] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const mainComponent = useRef<HTMLDivElement>(null);

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
		<div className='bg-[#111111] text-white min-h-screen overflow-x-hidden max-h-screen w-full overflow-y-visible'>
			<Navbar navDetach={navDetach} />
			<div className='h-screen'>
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
							<motion.p variants={textItem}>
								Host your own Sky Transfer Server
							</motion.p>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
