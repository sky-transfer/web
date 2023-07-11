import Banner from '../components/Banner';

export default function Home() {
	return (
		<div className='bg-[#111111] text-white min-h-screen overflow-x-hidden'>
			<div className='h-16 w-full bg-[#222] fixed top-0 left-0 p-2 flex z-50'>
				<p className='uppercase text-2xl my-auto font-black tracking-widest'>
					Skytransfer
				</p>
			</div>
			<div className='h-16' />
			<Banner />
			<div className='mx-auto container p-2'></div>
		</div>
	);
}
