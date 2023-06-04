import { useCountdown, useGameData } from '~/hooks';
import { useEffect, useMemo } from 'react';
import moment from 'moment';

interface CountdownProps {
	end: number;
}

function Countdown({ end }: CountdownProps) {
	if (end === 0) return null;

	const { data, setData } = useGameData();

	const date = useMemo(() => moment().add(end, 'milliseconds'), []);
	const countdown = useCountdown(date);
	const duration = moment.duration(countdown);

	useEffect(() => {
		if (!data.failed && !data.finished && countdown <= 0) {
			setData({ ...data, failed: true });
		}
	}, [countdown, data]);

	if (data.failed || data.finished) return null;

	const time = [
		duration.hours(),
		duration.minutes(),
		duration.seconds()
	].map(t => t.toString().padStart(2, '0')).join(':').replace(/^0(?:0:0?)?/, '');

	return <span className='countdown'>
		{time}
	</span>;
};

export default Countdown;