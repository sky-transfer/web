import useScroll from '../util/useScroll';

export default function Banner(props: {
	scrollComponent?: React.RefObject<HTMLDivElement>;
}) {
	const { scrollY } = useScroll(props.scrollComponent);

	return (
		<div className='bg-[#111111] w-full h-screen relative overflow-hidden'>
			<div className='absolute top-0 left-0 h-64 lg:h-[40rem] aspect-square rounded-full bg-[#ccf] -translate-x-1/2 -translate-y-1/2 blur-3xl lg:blur-[192px]' />

			<div className='absolute right-4 lg:right-10 bottom-4 h-60 md:h-72 aspect-square rounded-full bg-[#3333CD] blur-3xl lg:blur-[96px]' />
			<div className='absolute right-8 lg:right-40 top-20 h-56 md:h-60 aspect-square rounded-full bg-[#5A5AD6] blur-3xl lg:blur-[96px]' />
			<div className='absolute left-10 lg:left-80 bottom-24 h-48 md:h-80 aspect-square rounded-full bg-[#9090EB] blur-3xl lg:blur-[128px]' />
			<div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
				<div
					className='text-center'
					style={{
						transform: `translateY(${scrollY / 4}px)`,
					}}
				>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						Sharing text was never that easy
					</h1>
					<p className='text-xl md:text-2xl lg:text-3xl'>Meet Sky Transfer</p>
					<div className='my-8' />
					<button className='rounded-full bg-[#ccf] p-4 text-black active:scale-95 hover:drop-shadow-glow transition-all duration-100'>
						Get me started!
					</button>
				</div>
			</div>
		</div>
	);
}
