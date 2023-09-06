import React, {useState, useRef, useEffect} from "react"

function Stopwatch({title, details, id, onDelete}) {
	const [stopwatch, setStopwatch] = useState({h: 0, m: 0, s: 0})
	const [active, setActive] = useState(false)

	const controlRef = useRef()
	const stopwatchRef = useRef()
	const displayRef = useRef()

	const going = useRef(false)

	function clickSound() {
		return new Audio(
			"data:audio/ogg;base64,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hjNqUSQgoiJb2e3/////sQhCmTKhzmRaxBQDJFEhGyNySOytJAAGANlghDqcvHyNgdhKdLJnx4VXKwmbtcXODiXec9pvDw6ZMl3w1scM0hWOLRm5cwynfNRzSiaxCFOx0QchNWzHTeC7+a3Dux2lVbB0K/////////////tVf07Xat8rEjEnu8iSjshFcysxjGuFBvJIACmH//+np6/v3vXmtayz1+Yd0n7ff7vb6rp////m0VVYx849y7GWMVjWtHmMYkUH5hU8SCI+c5xEdHVFY1F7LPGwmDBhUqLBx5FK5bLY5GAA+bCjrva729Pa8WiMXL6QmR1rpuZlitsqDtBC4Zi02HmD301nl3PrVT2QxuQjOHoprbDCGKBNd1/4HsdgPFPLlHZN6zeG//uQZOWAY894RunpE/JDpqj9MCIODt3hGaYYWokmvWIUEB24mY4zKSO6Jzn6Nf//////////////t+1aVMdFzss5iEPPUrFcqna4SDUBRguNltyONtAAZ2cDapCwsLxnVXllgyxcrmz32cWV2q52R5Cf1anOBCgQFCyQPLr6u1SujNG3NSKRUvLPRGIycs/SRO4rhALtGai1vkeWtpKIoy6Ho2yv/vX///////////S1n+tYi9ns9CkdSluUOoUWYGgJylAEMZndBrq7I7Jba2AAkRczDF1LYZdI53kzkgOq6ex6QIumFvi4gvGT3zLiXLgmJpWNXxI7+FK4RIzgqBErZUGvlrcENfKx64KqLR1rEYSCnbCSDwBOhfahhJIG6P//////////////7f7ps6HVTNuuyuZTnSWcYpjrEHoGyRuSSXRtlwkDsWRrJyfGFY6UHAruPCArEkAd5wOI1o/oAek4fRzKhP8tlcim2mK7Coe0ffhv6QMzsuDkJCVG2SCMaYITC6mW0gb2lF5zV6HNQXFoQjwYtrp1MnkndGf///twZOUA88J5RunsFHIAAA/wAAABD1nlF6eYWoAAAD/AAAAE///////////9r/b671azlV3R3KRs90UUyK6qYQgplMRQpFaWWq2WWFxAAHUIvElavKozdJO+lORWWMl5LCAqovRiqDB2rtFFgS1Y5EwwhEyJUx2QGA9BP11auxELjQ+JaDQhEBMS65AkVXFQK+aK/KHt9bk/pCs3KccpMStN////////boNPGi4oxzDLnmFiwIlQ4WLJtlNqNgkAUkxLT9OtAREFui4iKUz3p+E6H03F2TCFHabp2ocLiwVWNzhiasBYw3lMVtTj6XeQoWxmMzC3fkt2OKolm8Wamm7fwFELZRSHPZSs3///X///v/////+rzpJNZHdXMdkQjnU5jsxEK6iwQpXgxjgw5TEUoAhgMzFFsf/7YGT2AfO5d0bp4xcSAAAP8AAAARBV5xmmJFqIAAA/wAAABIS7h3pMFONpRCJAAMUdDZv8WfSIc3lxRAmxcnZPR6jyP1UrPjUv6REyaFmlSEUuIibVWbz/+NESEYA00s0VJUkLKyJ6SmMZ6GMLaGEQBFRIPMY3Q3//////////////6f/0M+Z6Gfmlv9DKyHDorlySsUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7cGTpgPOTMUdpj0swAAAP8AAAARBl6RWHpFNAAAA/wAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+zBk+Q/zb3XFaeksUgAAD/AAAAEAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU="
		).play()
	}

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
		clickSound()
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
