export default function Navbar(props: { navDetach: boolean }) {
	return (
		<div
			className={`h-16 w-[calc(100%-25px)] bg-[#111] border border-white backdrop-blur-sm ${
				props.navDetach
					? 'bg-opacity-50 rounded-lg m-2 border-opacity-5'
					: 'bg-opacity-0 border-opacity-0'
			} fixed top-0 left-0 w-[calc(100%-20px)] p-4 flex z-50 transition-all duration-200`}
		>
			<p className='uppercase text-2xl my-auto font-black tracking-widest'>
				Skytransfer
			</p>
		</div>
	);
}
