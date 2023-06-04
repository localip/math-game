import { Box, Button, TextField } from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import { useState } from 'react';

import { useGameData } from '~/hooks';
import { Equation } from '~/util';
import { Header } from '.';

import Correct from '-/correct.mp3';
import Fail from '-/fail.mp3';
import './game.scss';

const correct = new Audio(Correct);
const fail = new Audio(Fail);

function Game() {
	const [equation, setEquation] = useState(Equation.generate());
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
	const [success, setSuccess] = useState<boolean>(null!);
	const [response, setResponse] = useState('');
	const { data, setData } = useGameData();

	return <Box
		className='game'
		display='flex'
		justifyContent='center'
		alignItems='center'
		flexDirection='column'
		minHeight='100vh'
	>
		<Header key='header' />
		<Box className='game-body' data-failed={data.failed}>
			{!data.failed && !data.finished ? <>
				<div className='question'>
					Calculate <span className='equation'>{equation.formula}</span>
				</div>
				<TextField
					error={success === false}
					label='Answer'
					className='response'
					placeholder='10'
					color='primary'
					value={response ?? ''}
					onChange={ref => ref.target.value ?
						parseInt(ref.target.value) &&
						setResponse(ref.target.value) :
						setResponse('')
					}
				/>
				<Button
					disabled={!response}
					onClick={() => {
						if (!response) return;

						const payload = { ...data };

						if (timeoutId) clearTimeout(timeoutId);
						const timeout = setTimeout(() => setSuccess(null!), 3000);
						setTimeoutId(timeout);

						const node = (equation.result == response ? correct : fail).cloneNode(true) as unknown as InstanceType<typeof Audio>;
						node.play();

						if (equation.result == response) {
							payload.points += 1;

							if (payload.round === 10 && payload.level < 2) {
								payload.round = 1;
								payload.level += 1;
							} else if (payload.round === 10 && payload.level === 2) {
								payload.finished = true;
							} else {
								payload.round += 1;
							}

							setSuccess(true);
							setEquation(Equation.generate());
						} else {
							setSuccess(false);
						}

						setResponse('');
						setData(payload);
					}}
				>
					Submit
				</Button>
				{success !== null && <span className='message' data-success={String(success)}>
					{success ? 'Well done!' : 'That\'s not it, Try again!'}
				</span>}
			</> : data.finished ? <>
				<Done className='success-icon' />
				<span className='success-title'>
					Well done!
				</span>
				<span className='success-description'>
					You have finished the game. If you'd like to play again, use the reload button to restart the game.
				</span>
			</> : <>
				<Close className='failed-icon' />
				<span className='failed-title'>
					You ran out of time.
				</span>
				<span className='failed-description'>
					Please use the reload button to restart the game.
				</span>
			</>}
		</Box>
	</Box>;
};

export default Game;