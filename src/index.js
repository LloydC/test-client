import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

let container = document.getElementById('root');
let root = createRoot(container);
root.render(<App/>);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />,
//   </React.StrictMode>,
//   document.getElementById('root')
// );
