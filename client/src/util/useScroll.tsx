import { useEffect, useState } from 'react';

function useScroll(ref?: React.RefObject<HTMLDivElement>) {
	const [scrollY, setScrollY] = useState(0);
	const [scrollX, setScrollX] = useState(0);

	const component = ref?.current || document.body;

	useEffect(() => {
		component.addEventListener('scroll', onScroll);

		function onScroll() {
			setScrollY(component.scrollTop);
			setScrollX(component.scrollLeft);
		}

		return () => {
			component.removeEventListener('scroll', onScroll);
		};
	}, []);

	return { scrollY, scrollX };
}

export default useScroll;
