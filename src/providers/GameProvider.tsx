import { SetStateAction, useContext, useState } from 'react';
import { GameContext } from '~/context';

export interface GameData {
	round: number;
	level: 0 | 1 | 2;
	points: number;
	failed: boolean;
	finished: boolean;
}

const stored = (() => {
	try {
		const store = localStorage.getItem('store');
		if (!store) return null;

		return JSON.parse(store);
	} catch {
		return null;
	}
})();

function GameProvider(props: React.PropsWithChildren) {
	const defaults = useContext(GameContext);
	const [data, set] = useState<GameData>(stored ?? defaults.data);

	const setData = (value: SetStateAction<GameData>) => {
		set(prev => {
			let res = value;

			if (typeof value === 'function') {
				res = value(prev);
			}

			save(res);

			return res as any;
		});
	};

	const reset = () => {
		set(defaults.data);
		save(defaults.data);
	};

	return <GameContext.Provider value={{ data, setData, reset }}>
		{props.children}
	</GameContext.Provider>;
}

function save(store: any) {
	const stringified = JSON.stringify(store);
	localStorage.setItem('store', stringified);
}

export default GameProvider;