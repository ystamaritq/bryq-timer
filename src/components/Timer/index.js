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

	useEffect(() => {
		start();
		return () => stop();
	}, [start, stop]);

	return (
		<div
			className="timerContainer" data-testid="timerContainer"
			style={{ backgroundColor: backgroundColor }}
		>
			<div className="timerIcon">
				<div className="timerIconBackground"></div>
				<div
					className="timerIconTime"
					style={{
						backgroundImage: `conic-gradient(${backgroundColor} 0% ${timerPercentage}%, white 0% 100%)`,
					}}
				></div>
			</div>
			<span className="timerText">{formatDisplayableTime(currentTime)}</span>
		</div>
	);
};

export default Timer;
