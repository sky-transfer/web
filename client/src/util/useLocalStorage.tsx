import { useState } from 'react';

export default function useLocalStorage<T>({
	key,
	defaultValue,
}: {
	key: string;
	defaultValue: T;
}) {
	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key);

		return storedValue ? JSON.parse(storedValue) : defaultValue;
	});

	return {
		value,
		setValue: (value: T) => {
			setValue(value);
		},
	};
}
