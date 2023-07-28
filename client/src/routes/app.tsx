import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { QRCodeCanvas } from 'qrcode.react';
import useSocket from '../util/useSocket';
import moment from 'moment';
import { IconSettings, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../util/useLocalStorage';
import axios from 'axios';

export default function App() {
	const [code, setCode] = useState('');
	const [deviceID, setDeviceID] = useState('');

	const { value: url, setValue: setURL } = useLocalStorage<string>({
		key: 'url',
		defaultValue: 'https://sky-transfer.redcrafter07.de',
	});

	const [texts, setTexts] = useState<{ msg: string; timestamp: number }[]>([]);
	const [type, setType] = useState<'receiver' | 'sender'>();

	const [inputText, setInputText] = useState('');

	const navigate = useNavigate();

	const { socket, changeURL } = useSocket(url);

	const [showSettings, setShowSettings] = useState(false);

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

		socket.on('connect', () => {
			console.log(`[ST]: Connected to ${url}`);
		});

		socket.connect();
	}, []);

	return (
		<div className='min-h-screen overflow-x-hidden max-h-screen overflow-y-visible bg-[#222]'>
			<div
				className={`z-[690] absolute top-0 left-0 w-full h-screen ${
					showSettings
						? 'backdrop-blur-sm pointer-events-auto'
						: 'backdrop-blur-0 pointer-events-none'
				} transition-all duration-200`}
			>
				<div className='relative w-full h-full'>
					<div
						className='absolute top-0 left-0 w-full h-full'
						onClick={() => {
							setShowSettings(false);
						}}
					/>
				</div>
				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none'>
					<div
						className={`bg-[#333] rounded-lg p-8 ${
							showSettings
								? 'pointer-events-auto translate-y-0 opacity-100'
								: 'pointer-events-none translate-y-[100px] opacity-0'
						} transition-all duration-200`}
					>
						<h1 className='text-[#ccf] font-bold'>Settings</h1>
						<h3 className='text-xl'>Host URL</h3>
						<p className='opacity-80'>
							The URL of the Sky Transfer Server. Change if you want to use your
							self hosted server.
						</p>
						<p className='opacity-50'>Current: {url}</p>
						<form
							onSubmit={(e) => {
								e.preventDefault();

								const url = new FormData(e.target as HTMLFormElement).get(
									'url',
								) as string;

								axios
									.get(
										`${url}${url.endsWith('/') ? '' : '/'}.skytransfer/isHost`,
									)
									.then((res) => {
										try {
											JSON.stringify(res.data);

											setURL(url);
											changeURL(url);
										} catch (e) {
											console.log(e);
											alert('This is not a Sky Transfer Server!');
											return;
										}
									});
							}}
						>
							<div className='flex flex-row'>
								<input
									name='url'
									type='text'
									className='w-full p-2 focus:outline-none border-2 border-white border-opacity-10 placeholder:text-white focus:border-opacity-30 placeholder:opacity-50 bg-[#111] rounded-l-lg transition-all duration-100'
									placeholder='https://sky-transfer.redcrafter07.de'
									required
									defaultValue={url}
								/>

								<button className='bg-green-600 hover:bg-opacity-75 active:scale-95 py-2 px-4 text-white rounded-r-lg'>
									<p className='font-bold'>Save</p>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

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
				<button className='absolute top-4 right-4'>
					<IconSettings
						className='text-[#ccf] hover:rotate-45 active:-rotate-45 transition-all duration-100 cursor-pointer active:scale-95'
						onClick={() => {
							setShowSettings(true);
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
										className='w-full p-2 focus:outline-none border-2 border-white border-opacity-10 placeholder:text-white focus:border-opacity-30 placeholder:opacity-50 bg-[#111] rounded-lg transition-all duration-100'
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
										className='w-full p-2 focus:outline-none border-2 border-white border-opacity-10 placeholder:text-white focus:border-opacity-30 placeholder:opacity-50 bg-[#111] rounded-lg transition-all duration-100'
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
