import GameContext from '~/context/GameContext';
import { useContext } from 'react';

function useGameData() {
	return useContext(GameContext);
}

export default useGameData;