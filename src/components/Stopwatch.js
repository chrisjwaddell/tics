import React, {useState, useRef, useEffect} from "react"

function Stopwatch({title, details, id, onDelete}) {
	const [stopwatch, setStopwatch] = useState({h: 0, m: 0, s: 0})
	const [active, setActive] = useState(false)

	const controlRef = useRef()
	const stopwatchRef = useRef()
	const displayRef = useRef()

	const going = useRef(false)

	function flashDisplay(active, going) {
		if (active) {
			if (going) {
				displayRef.current.className = "stopwatch__time"
			} else {
				displayRef.current.className = "stopwatch__time blink"
			}
		} else {
			displayRef.current.className = "stopwatch__time"
		}
	}

	function displayTime(timeobj) {
		return `${timeobj.h < 10 ? "0" + timeobj.h : timeobj.h}:${
			timeobj.m < 10 ? "0" + timeobj.m : timeobj.m
		}:${timeobj.s < 10 ? "0" + timeobj.s : timeobj.s}`
	}

	function increaseTime(timeobj) {
		if (timeobj.s < 59) {
			return {...timeobj, s: timeobj.s + 1}
		} else {
			if (timeobj.m < 59) {
				return {...timeobj, m: timeobj.m + 1, s: 0}
			} else {
				return {...timeobj, h: timeobj.h + 1, m: 0, s: 0}
			}
		}
	}

	function handleStart() {
		if (!active) {
			setActive(true)
			if (!going.current) {
				stopwatchRef.current = setInterval(() => {
					if (going.current) setStopwatch((t) => increaseTime(t))
				}, 1000)
			}
		}
		going.current = true
		flashDisplay(active, true)
	}

	function handlePause() {
		if (active) {
			if (going.current) {
				going.current = false
			}
		}
		flashDisplay(active, false)
	}

	function handleCancel() {
		clearTimeout(stopwatchRef.current)
		setStopwatch({h: 0, m: 0, s: 0})
		setActive(false)
		flashDisplay(false, false)
	}

	return (
		<div
			id={id}
			ref={controlRef}
			className="gadget-container stopwatch corner"
		>
			<div className="gadget-container__top">
				<h2>STOPWATCH</h2>
				<div className="c-close">
					<div
						className="c-close__container"
						onClick={() => onDelete(id)}
					></div>
				</div>
			</div>

			<h3>{title}</h3>
			<div ref={displayRef} className="stopwatch__time">
				<p>{displayTime(stopwatch)}</p>
			</div>
			<div className="gadget-container__details">
				<p>{details}</p>
			</div>
			<div className="o-flex">
				<button
					className="stopwatch__start corner"
					onClick={handleStart}
				>
					Start
				</button>
				<button
					className="stopwatch__pause corner"
					onClick={handlePause}
				>
					Pause
				</button>
				<button
					className="stopwatch__reset corner"
					onClick={() => {
						if (confirm("Are you sure?")) handleCancel()
					}}
				>
					Reset
				</button>
			</div>
		</div>
	)
}

export default Stopwatch
