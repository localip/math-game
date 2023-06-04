import { useEffect } from 'react';

function useOnUnmount(callback: ReturnType<React.EffectCallback>) {
	useEffect(() => callback, []);
}

export default useOnUnmount;