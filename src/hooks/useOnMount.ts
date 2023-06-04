import { useEffect } from 'react';

function useOnMount(callback: React.EffectCallback) {
	useEffect(callback, []);
}

export default useOnMount;