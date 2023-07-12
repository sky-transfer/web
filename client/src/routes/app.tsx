import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { QRCodeCanvas } from 'qrcode.react';
import useSocket from '../util/useSocket';
import moment from 'moment';
import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function App() {
	const [code, setCode] = useState('');
	const [deviceID, setDeviceID] = useState('');

	const [texts, setTexts] = useState<{ msg: string; timestamp: number }[]>([]);
	const [type, setType] = useState<'receiver' | 'sender'>();

	const [inputText, setInputText] = useState('');

	const navigate = useNavigate();

	const socket = useSocket();

	useEffect(() => {
		socket.on('code', (c: string) => {
			setCode(c);
		});

		socket.on('deviceID', (id: string) => {
			setDeviceID(id);
		});

		socket.on('error', (e: string) => {
			console.log(e);
		});

		socket.on('text', (text: string) => {
			setTexts((prev) => [{ msg: text, timestamp: moment().unix() }, ...prev]);
		});

		socket.on('type', (type: 'receiver' | 'sender') => {
			setType(type);
		});

		socket.on('end-disconnected', () => {
			setCode('');
			setDeviceID('');
			setTexts([]);
			setType(undefined);
		});

		socket.connect();
	}, []);

	return (
		<div className='min-h-screen overflow-x-hidden max-h-screen overflow-y-visible bg-[#222]'>
			<div className='flex min-h-screen'>
				<button className='absolute top-4 left-4'>
					<IconX
						className='text-[#ccf] hover:text-[#ff3434] transition-all duration-100 cursor-pointer active:scale-95'
						onClick={() => {
							if (!type) {
								socket.disconnect();
								navigate('/');
								return;
							}

							setCode('');
							setDeviceID('');
							setTexts([]);
							setType(undefined);

							socket.disconnect();
						}}
					/>
				</button>
				<div className='container mx-auto p-2'>
					{type ? (
						type == 'sender' ? (
							<div>
								<h1 className='text-[#ccf] font-bold'>Send a message</h1>
								<p className='opacity-80 text-xl'>Text</p>
								<form
									onSubmit={(e) => {
										e.preventDefault();

										socket.emit('text', inputText);

										setInputText('');
									}}
								>
									<input
										name='code'
										type='text'
										className='w-full p-2 focus:outline-none border-2 border-white border-opacity-10 placeholder:text-white focus:border-opacity-30 placeholder:opacity-50 bg-[#222] rounded-lg transition-all duration-100'
										placeholder='Code'
										value={inputText}
										onChange={(e) => {
											setInputText(e.target.value);
										}}
									/>
								</form>
							</div>
						) : (
							<div className='flex flex-col gap-4'>
								<h1 className='text-[#ccf] font-bold'>Received messages</h1>
								<p>Session code: {code}</p>
								{texts.map((text, i) => (
									<p key={i} className='bg-[#333] rounded-lg p-2'>
										[{moment.unix(text.timestamp).format('HH:mm:ss')}]{' '}
										{text.msg}
									</p>
								))}
							</div>
						)
					) : (
						<div className='flex flex-col gap-8 lg:flex-row w-full h-full items-center'>
							<div className='flex-1 flex flex-col items-center justify-center'>
								<h1 className='text-[#ccf] text-3xl font-bold'>Send text</h1>
								<div className='my-4' />
								<h3 className='opacity-80 text-xl'>Scan the QR Code</h3>
								<div className='my-2' />
								<QRCodeCanvas value={code} bgColor='#0000' fgColor='#ccf' />
								<div className='my-4' />
								<h3 className='opacity-80 text-xl'>
									or type in the code manually:
								</h3>
								<div className='my-2' />
								<p>{code}</p>
							</div>
							<div className='flex flex-row lg:flex-col w-full h-auto lg:w-auto lg:h-full items-center gap-4'>
								<div className='h-px w-full lg:h-full lg:w-px bg-white opacity-10 flex-1' />
								<p>OR</p>
								<div className='h-px w-full lg:h-full lg:w-px bg-white opacity-10 flex-1' />
							</div>
							<div className='flex-1 flex flex-col items-center justify-center'>
								<h1 className='text-[#ccf] text-3xl font-bold'>Receive</h1>
								<div className='my-4' />
								<p>Type in code:</p>
								<div className='my-2' />
								<form
									onSubmit={(e) => {
										e.preventDefault();
										const code = new FormData(e.target as HTMLFormElement).get(
											'code',
										);

										socket.emit('code', code);
									}}
								>
									<input
										name='code'
										type='text'
										className='w-full p-2 focus:outline-none border-2 border-white border-opacity-10 placeholder:text-white focus:border-opacity-30 placeholder:opacity-50 bg-[#222] rounded-lg transition-all duration-100'
										placeholder='Code'
									/>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}
