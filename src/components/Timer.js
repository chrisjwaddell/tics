import React, {useState, useRef, useEffect} from "react"

function Timer({title, details, id, onDelete}) {
	const [timer, setTimer] = useState({h: 0, m: 0, s: 0})
	const [s, setS] = useState(0)
	const [m, setM] = useState(0)
	const [h, setH] = useState(0)

	const [active, setActive] = useState(false)
	const going = useRef(false)

	const controlRef = useRef()
	const timerRef = useRef()
	const startingTimer = useRef()

	useEffect(() => {
		startingTimer.current = {h: 0, m: 0, s: 0}
	}, [])

	function displayTime(timeobj) {
		return `${timeobj.h < 10 ? "0" + timeobj.h : timeobj.h}:${
			timeobj.m < 10 ? "0" + timeobj.m : timeobj.m
		}:${timeobj.s < 10 ? "0" + timeobj.s : timeobj.s}`
	}

	function decreaseTime(timeobj) {
		if (timeobj.s === 0) {
			if (timeobj.m === 0) {
				if (timeobj.h === 0) {
					clearTimeout(timerRef.current)
					going.current = false

					console.log(
						`${title} Timer finished:
                        ${!details ? "" : details}`
					)
					alert(
						`${title} Timer finished:
                        ${!details ? "" : details}`
					)
					setActive(false)
					return startingTimer.current
				} else {
					return {...timeobj, s: 59, m: 59, h: timeobj.h - 1}
				}
			} else {
				return {...timeobj, s: 59, m: timeobj.m - 1}
			}
		} else {
			return {...timeobj, s: timeobj.s - 1}
		}
	}

	function handleStart() {
		if (!active) {
			setActive(true)
			if (!going.current) {
				setTimer((t) => decreaseTime(t))
				timerRef.current = setInterval(() => {
					if (going.current) setTimer((t) => decreaseTime(t))
				}, 1000)
			}
		}
		going.current = true
	}

	function handlePause() {
		if (active) {
			if (going.current) {
				going.current = false
			}
		}
	}

	function handleCancel() {
		clearTimeout(timerRef.current)
		going.current = false
		setTimer(startingTimer.current)
		setActive(false)
	}

	function onChangeH(e) {
		let newTimer = {...timer, h: Number(e.target.value)}
		setTimer(newTimer)
		startingTimer.current = newTimer
	}

	function onChangeM(e) {
		let newTimer = {...timer, m: Number(e.target.value)}
		setTimer(newTimer)
		startingTimer.current = newTimer
	}

	function onChangeS(e) {
		let newTimer = {...timer, s: Number(e.target.value)}
		setTimer(newTimer)
		startingTimer.current = newTimer
	}

	return (
		<div id={id} ref={controlRef} className="gadget-container timer corner">
			<div className="gadget-container__top">
				<h2>TIMER</h2>
				<div className="c-close">
					<div
						className="c-close__container"
						onClick={() => onDelete(id)}
					></div>
				</div>
			</div>
			<h3>{title}</h3>
			<div className="timer__time">
				<div className="timer__inputs">
					<input
						type="text"
						className="h"
						key="h"
						value={timer.h > 9 ? timer.h : "0" + timer.h}
						onChange={onChangeH}
						disabled={going.current}
					/>
					<span>:</span>
					<input
						type="text"
						className="m"
						key="m"
						value={timer.m > 9 ? timer.m : "0" + timer.m}
						onChange={onChangeM}
						disabled={going.current}
					/>
					<span>:</span>
					<input
						type="text"
						className="s"
						key="s"
						value={timer.s > 9 ? timer.s : "0" + timer.s}
						onChange={onChangeS}
						disabled={going.current}
					/>
				</div>
			</div>
			<div className="gadget-container__details">
				<p>{details}</p>
			</div>
			<div className="o-flex">
				<button className="timer__start corner" onClick={handleStart}>
					Start
				</button>
				<button className="timer__pause corner" onClick={handlePause}>
					Pause
				</button>
				<button
					className="timer__reset corner"
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

export default Timer
