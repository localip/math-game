import { Box, IconButton, Tooltip, useColorScheme } from '@mui/material';
import { DarkMode, LightMode, Replay } from '@mui/icons-material';

import { Timeouts } from '~/constants';
import { useGameData } from '~/hooks';
import { Countdown } from '.';

import './header.scss';

function Header(props: React.PropsWithRef<any>) {
	const { data, reset } = useGameData();
	const scheme = useColorScheme();

	return <header className='header' {...props}>
		<div className='title'>
			<span className='level'>Level {data.level}</span>
			<span className='round'>Round {data.round}</span>
			<span className='points'>{data.points} out of 30 points</span>
			<Countdown
				key={[data.level, data.round, data.failed, data.finished].join('-')}
				end={Timeouts[data.level]}
			/>
		</div>
		<Box display='flex' gap='.5rem'>
			<Tooltip title={scheme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}>
				<IconButton onClick={() => scheme.setMode(scheme.mode === 'light' ? 'dark' : 'light')}>
					{scheme.mode === 'light' ? <DarkMode /> : <LightMode />}
				</IconButton>
			</Tooltip>
			<Tooltip title='Reset Game'>
				<IconButton onClick={() => reset()}>
					<Replay />
				</IconButton>
			</Tooltip>
		</Box>
	</header>;
}


export default Header;