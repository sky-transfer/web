import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-8 bg-[#111] text-center lg:text-left'>
			<div className='my-auto'>
				<h1 className='text-3xl font-black uppercase tracking-widest text-[#ccf]'>
					Skytransfer
				</h1>
				<p>©️ 2023 RedCrafter07</p>
			</div>
			<div className='my-auto lg:my-0'>
				<p className='text-[#ccf] font-bold text-xl'>Important links</p>
				<div className='my-2' />
				<Link className='underline text-white' to='/'>
					<p>Home</p>
				</Link>
				<Link className='underline text-white' to='/app'>
					<p>Web App</p>
				</Link>
				<a
					className='underline text-white'
					href='https://github.com/sky-transfer'
					target='_blank'
				>
					<p>GitHub</p>
				</a>
			</div>
			<div className='my-auto lg:my-0'>
				<p className='text-[#ccf] font-bold text-xl'>Legal</p>
				<div className='my-2' />
				<a
					className='underline text-white'
					href='https://redcrafter07.de/imprint'
					target='_blank'
				>
					<p>Imprint</p>
				</a>
			</div>
		</div>
	);
}
