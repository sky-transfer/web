import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@fontsource/figtree';
import '@fontsource/figtree/900.css';
import '@fontsource/figtree/700.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(<App />);
