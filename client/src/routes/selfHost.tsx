import { AnimatePresence, motion } from 'framer-motion';
import { textContainer, textItem } from '../components/Banner';

export default function selfHost() {
	return (
		<div className='bg-[#111111] text-white min-h-screen overflow-x-hidden max-h-screen w-full overflow-y-visible'>
			<div className='h-screen'>
				<AnimatePresence>
					<motion.div
						variants={textContainer}
						initial='hidden'
						animate='show'
						className='grid place-items-center h-full text-center'
					>
						<div className='flex flex-col gap-4'>
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
