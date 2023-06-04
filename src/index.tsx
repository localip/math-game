/// <reference types="vite/client" />

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import React from 'react';

import { GameProvider } from '~/providers';
import { Game } from '~/components';
import './global.scss';

// Render app
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<React.StrictMode>
	<CssVarsProvider>
		<GameProvider>
			<Game />
		</GameProvider>
	</CssVarsProvider>
</React.StrictMode>);
