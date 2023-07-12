import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { QRCodeCanvas } from 'qrcode.react';
import useSocket from '../util/useSocket';

export default function App() {
	const [code, setCode] = useState('');
	const [deviceID, setDeviceID] = useState('');

	const [texts, setTexts] = useState<string[]>([]);

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
			setTexts((prev) => [text, ...prev]);
		});

		socket.connect();
	}, []);

	return (
		<div>
			<div className='flex min-h-screen'>
				<div className='flex flex-row w-full my-auto'>
					<div className='flex-1'>
						<h1 className='text-[#ccf] text-3xl font-bold'>Send text</h1>
						<p className='opacity-80'>Scan the QR Code</p>
						<QRCodeCanvas value={code} />
					</div>
					<div className='flex-1'></div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
