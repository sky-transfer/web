import { useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(url: string = window.location.origin) {
	const [socket, setSocket] = useState(
		io(url, {
			transports: ['websocket'],
		}),
	);

	const changeURL = (url: string) => {
		socket.disconnect();

		setSocket(
			io(url, {
				transports: ['websocket'],
			}),
		);

		return socket;
	};

	return { socket, changeURL };
}
