import { IconRocket } from '@tabler/icons-react';
import { AnimatePresence, TargetAndTransition, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCursor from '../util/useCursor';

const container: Record<string, TargetAndTransition> = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.3,
		},
	},
};

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
};

const textContainer: Record<string, TargetAndTransition> = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const textItem = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.17, 0.67, 0.48, 0.98],
		},
	},
};

export default function Banner(props: { scrollY: number }) {
	const { scrollY } = props;
	const { x, y } = useCursor();

	const navigate = useNavigate();

	return (
		<div className='bg-[#111111] w-full h-screen relative overflow-hidden'>
			<AnimatePresence>
				<motion.div
					variants={container}
					initial='hidden'
					animate='show'
					className='w-full h-full absolute top-0 left-0'
					style={{
						transform: `translate(${x / 10}px, ${y / 10}px)`,
						// smooth the translation
						transition: 'transform 0.5s cubic-bezier(.22,.42,.31,.99)',
					}}
				>
					<motion.div
						variants={item}
						className='absolute top-0 left-0 h-64 lg:h-[40rem] aspect-square rounded-full bg-[#ccf] -translate-x-1/2 -translate-y-1/2 blur-3xl lg:blur-[192px]'
					/>
					<motion.div
						variants={item}
						className='absolute right-4 lg:right-10 bottom-4 h-60 md:h-72 aspect-square rounded-full bg-[#3333CD] blur-3xl lg:blur-[96px]'
					/>
					<motion.div
						variants={item}
						className='absolute right-8 lg:right-40 top-20 h-56 md:h-60 aspect-square rounded-full bg-[#5A5AD6] blur-3xl lg:blur-[96px]'
					/>
					<motion.div
						variants={item}
						className='absolute left-10 lg:left-80 bottom-24 h-48 md:h-80 aspect-square rounded-full bg-[#9090EB] blur-3xl lg:blur-[128px]'
					/>
				</motion.div>
			</AnimatePresence>

			<div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
				<div
					className='text-center'
					style={{
						transform: `translateY(${
							scrollY < window.innerHeight
								? scrollY / 3
								: window.innerHeight / 3
						}px)`,
					}}
				>
					<AnimatePresence>
						<motion.div
							variants={textContainer}
							initial='hidden'
							animate='show'
						>
							<motion.h1
								variants={textItem}
								className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'
							>
								Text sharing has never been easier
							</motion.h1>
							<div className='h-2' />
							<motion.p
								variants={textItem}
								className='text-xl md:text-2xl lg:text-3xl'
							>
								Meet Sky Transfer
							</motion.p>
							<div className='my-8' />
							<motion.div variants={textItem}>
								<button
									className='mx-auto btn-primary flex flex-row gap-4 font-bold'
									onClick={() => {
										/* const start = document.getElementById('start');
							if (!start) return;
							start.scrollIntoView({ behavior: 'smooth' }); */
										navigate('/app');
									}}
								>
									<IconRocket /> Get me started!
								</button>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
