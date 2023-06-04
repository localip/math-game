import type { GameData } from '~/providers/GameProvider';
import { SetStateAction, createContext } from 'react';

export interface GameContextProps {
	data: GameData;
	setData: (value: SetStateAction<GameData>) => void;
	reset: () => void;
}

const context = createContext({
	setData: () => void 0,
	reset: () => void 0,
	data: {
		level: 0,
		round: 1,
		points: 0,
		failed: false,
		finished: false
	},
} as GameContextProps);

export default context;