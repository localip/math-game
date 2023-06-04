import { useEffect, useState } from 'react';
import { useGameData } from '.';
import moment from 'moment';

function useCountdown(timeout: moment.Moment) {
	const { data } = useGameData();
	const rounded = Math.round(timeout.diff(moment()) / 1000) * 1000;
	const [countdown, setCountdown] = useState(rounded);

	useEffect(() => {
		if (data?.failed || data?.finished) return;

		const interval: NodeJS.Timer = setInterval(() => {
			if (countdown <= 0 || data.failed || data.finished) {
				return clearInterval(interval);
			}

			const rounded = Math.round(timeout.diff(moment()) / 1000) * 1000;
			setCountdown(rounded);
		}, 1000);

		return () => clearInterval(interval);
	}, [countdown]);

	return countdown;
}

export default useCountdown;