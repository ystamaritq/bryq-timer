import React, { useState } from "react";
import "./App.css";
import Timer from "./components/Timer";

const App = () => {
  const [showMessage, setShowMessage] = useState(false);
	return (
		<div className="App">
			<Timer
				value={4}
				onExpire={() => setShowMessage(true)}
			/>
      {showMessage && <h3 style={{paddingLeft: 35}}>The timer has expired!</h3>}
		</div>
	);
}

export default App;
