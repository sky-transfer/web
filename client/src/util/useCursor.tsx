import { useEffect, useState } from 'react';

export default function useCursor() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const onMouseMove = (e: MouseEvent) => {
		setX(e.clientX);
		setY(e.clientY);
	};

	// register
	useEffect(() => {
		window.addEventListener('mousemove', onMouseMove);
		return () => window.removeEventListener('mousemove', onMouseMove);
	}, []);

	return { x, y };
}
