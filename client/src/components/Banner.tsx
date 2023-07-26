import { IconRocket } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import useCursor from '../util/useCursor';

export default function Banner(props: { scrollY: number }) {
	const { scrollY } = props;
	const { x, y } = useCursor();

	const navigate = useNavigate();

	return (
		<div className='bg-[#111111] w-full h-screen relative overflow-hidden'>
			<div
				className='w-full h-full absolute top-0 left-0'
				style={{
					transform: `translate(${x / 10}px, ${y / 10}px)`,
					// smooth the translation
					transition: 'transform 0.5s cubic-bezier(.22,.42,.31,.99)',
				}}
			>
				<div className='absolute top-0 left-0 h-64 lg:h-[40rem] aspect-square rounded-full bg-[#ccf] -translate-x-1/2 -translate-y-1/2 blur-3xl lg:blur-[192px]' />
				<div className='absolute right-4 lg:right-10 bottom-4 h-60 md:h-72 aspect-square rounded-full bg-[#3333CD] blur-3xl lg:blur-[96px]' />
				<div className='absolute right-8 lg:right-40 top-20 h-56 md:h-60 aspect-square rounded-full bg-[#5A5AD6] blur-3xl lg:blur-[96px]' />
				<div className='absolute left-10 lg:left-80 bottom-24 h-48 md:h-80 aspect-square rounded-full bg-[#9090EB] blur-3xl lg:blur-[128px]' />
			</div>

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
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						Text sharing has never been easier
					</h1>
					<p className='text-xl md:text-2xl lg:text-3xl'>Meet Sky Transfer</p>
					<div className='my-8' />
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
				</div>
			</div>
		</div>
	);
}
