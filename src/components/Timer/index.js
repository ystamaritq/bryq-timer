import React, { useEffect } from "react";
import { formatDisplayableTime, useTimer } from "./utils";
import "./style.css";

const Timer = ({ value = 0, onExpire }) => {
	const {
		start,
		stop,
		currentTime,
		timerPercentage,
		backgroundColor,
	} = useTimer(value, onExpire);

	// set 1 second interval to update remaining time and trigger property changes
	useEffect(() => {
		start();
		return () => stop();
	}, [start, stop]);

	return (
		<div
			className="timerContainer"
			style={{ backgroundColor: backgroundColor }}
		>
			<div className="timerIcon">
				<div className="timerIconBackground"></div>
				<div
					className="timerIconTime"
					style={{
						backgroundImage: `conic-gradient(white 0% ${timerPercentage}%, ${backgroundColor} 0% 100%)`,
					}}
				></div>
			</div>
			<span className="timerText">{formatDisplayableTime(currentTime)}</span>
		</div>
	);
};

export default Timer;
