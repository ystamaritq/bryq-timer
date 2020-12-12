import React, { useEffect, useState } from "react";
import "./style.css";

/**
 * formats time into mm:ss format
 * @param {*} currentTime timeto be formatted, in seonds
 */
const formatDisplayableTime = (currentTime) => {
	const minutesRemaining = Math.floor(currentTime / 60);
	const secondsRemaining = currentTime % 60;
	const displaySeconds =
		secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
	return `${minutesRemaining}:${displaySeconds}`;
};

const Timer = ({ value, onExpire, defaultColor = "#00CBAB", warningColor = "#FF2771", changeColorAt = 4 }) => {
	const [currentTime, setCurrentTime] = useState(value);
	const [backgroundColor, setBackgroundColor] = useState(defaultColor);
	const [timerPercentage, setTimerPercentage] = useState(0);
	const changeColorAtTime = changeColorAt / 4 + 1;

	// set 1 second interval to update remaining time and trigger property changes
	useEffect(() => {
		const interval = setInterval(() => {
			// compute percentage of time remaining
			setTimerPercentage(100 - currentTime/value*100);
			// if time has expired
			if (currentTime === 0) {
				// stop
				clearInterval(interval);
				onExpire();
			} 
			// otherwise
			else {
				if (currentTime <= changeColorAtTime) {
					// set warning color
					setBackgroundColor(warningColor);
				}
				// update timer label
				setCurrentTime(currentTime - 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	});

	return (
		<div className="timerContainer" style={{ backgroundColor: backgroundColor }}>
			<div className="timerIcon">
				<div className="timerIconBackground"></div>
				<div className="timerIconTime" style={{backgroundImage: `conic-gradient(white 0% ${timerPercentage}%, ${backgroundColor} 0% 100%)`}}></div>
			</div>
			<span className="timerText">{formatDisplayableTime(currentTime)}</span>
		</div>
	);
};

export default Timer;
