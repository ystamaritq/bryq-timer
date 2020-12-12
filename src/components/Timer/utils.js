import { useState, useRef, useCallback } from "react";

/**
 * formats time into mm:ss format
 * @param {*} currentTime timeto be formatted, in seonds
 */
export const formatDisplayableTime = (currentTime) => {
	const minutesRemaining = Math.floor(currentTime / 60);
	const secondsRemaining = currentTime % 60;
	const displaySeconds =
		secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
	return `${minutesRemaining}:${displaySeconds}`;
};

/**
 * setup properties needed to run the timer
 * @param {*} initialValue 
 * @param {*} onExpire 
 * @param {*} ms 
 * @param {*} defaultColor 
 * @param {*} warningColor 
 * @param {*} changeColorAt 
 */
export const useTimer = (
	initialValue,
	onExpire,
	ms = 1000,
	defaultColor = "#00CBAB",
	warningColor = "#FF2771",
	changeColorAt = 4
) => {
	const [currentTime, setCurrentTime] = useState(initialValue);
	const [backgroundColor, setBackgroundColor] = useState(defaultColor);
	const [timerPercentage, setTimerPercentage] = useState(0);
	const changeColorAtTime = changeColorAt / 4 + 1;
	const intervalRef = useRef(null);

	const start = useCallback(() => {
		if (intervalRef.current !== null) {
			return;
		}
		intervalRef.current = setInterval(() => {
			// if time has expired
			if (currentTime === 0) {
				stop();
				onExpire();
			} else {
				if (currentTime <= changeColorAtTime) {
					setBackgroundColor(warningColor);
				}
				setCurrentTime(currentTime - 1);
			}
			// compute percentage of time remaining
			setTimerPercentage(100.0 - ((currentTime - 1) / initialValue) * 100.0);
		}, ms);
	}, [changeColorAtTime, currentTime, initialValue, ms, onExpire]);

	const stop = useCallback(() => {
		if (intervalRef.current === null) {
			return;
		}
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	}, []);

	return { start, stop, currentTime, timerPercentage, backgroundColor };
};
