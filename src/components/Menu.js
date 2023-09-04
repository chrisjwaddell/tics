import React, {useRef} from "react"

export default function Menu() {
	function handleTimer() {
		timerRef.current.classList.add("overflow-hidden")
		timerRef.current.showModal()
	}

	function handleCounter() {
		counterRef.current.classList.add("overflow-hidden")
		counterRef.current.showModal()
	}

	function handleStopwatch() {
		stopwatchRef.current.classList.add("overflow-hidden")
		stopwatchRef.current.showModal()
	}

	// function handleOpen() {
	// 	document.documentElement.classList.add("overflow-hidden")
	// 	document.querySelector("dialog").showModal()
	// }

	return (
		<aside role="banner">
			<div className="o-flex column">
				<button className="c-btn" ref={timerRef} onClick={handleTimer}>
					Add Timer
				</button>
				<button
					className="c-btn"
					ref={counterRef}
					onClick={handleCounter}
				>
					Add Counter
				</button>
				<button
					className="c-btn"
					ref={stopwatchRef}
					onClick={handleStopwatch}
				>
					Add Stopwatch
				</button>
			</div>
		</aside>
	)
}
