import React, {useState, useRef, useEffect} from "react"
import ReactDOM from "react-dom/client"

import PageHeader from "./components/PageHeader.js"
import Menu from "./components/Menu.js"
import Dialog from "./components/dialog-portal.js"
import {TextInput, TextInputF} from "./components/TextInput"
import TextArea from "./components/TextArea"

import Counter from "./components/Counter"
import Stopwatch from "./components/Stopwatch"
import Timer from "./components/Timer"

import "../src/style/main.css"
import "../src/style/app.css"
import "../src/style/counter.css"
import "../src/style/stopwatch.css"
import "../src/style/timer.css"

function App() {
	const timerModalRef = useRef()
	const counterModalRef = useRef()
	const stopwatchModalRef = useRef()

	const timerFormRef = useRef()
	const counterFormRef = useRef()
	const stopwatchFormRef = useRef()

	const timerTitleRef = useRef()
	const counterTitleRef = useRef()
	const stopwatchTitleRef = useRef()

	const mainRef = useRef()

	let arr = []

	try {
		arr = JSON.parse(window.localStorage.getItem("tics"))
		if (!arr) arr = []
	} catch (err) {
		arr = []
	}

	const [components, setComponents] = useState(arr)

	useEffect(() => {
		window.localStorage.setItem("tics", JSON.stringify(components))
	}, [components])

	function uuid() {
		let uuid = ""
		for (let i = 0; i < 32; i++) {
			let random = (Math.random() * 16) | 0
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += "-"
			}
			uuid += (
				i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random
			).toString(16)
		}
		return uuid
	}

	function handleTimer() {
		timerModalRef.current.classList.add("overflow-hidden")
		timerModalRef.current.showModal()
	}

	function handleCounter() {
		counterModalRef.current.classList.add("overflow-hidden")
		counterModalRef.current.showModal()
	}

	function handleStopwatch() {
		stopwatchModalRef.current.classList.add("overflow-hidden")
		stopwatchModalRef.current.showModal()
	}

	function handleTimerSubmit() {
		if (timerFormRef.current.elements.title.value) {
			timerModalRef.current.close()
			let newId = uuid()

			let newComponents = [
				...components,
				{
					name: "Timer",
					props: {
						id: newId,
						title: timerFormRef.current.elements.title.value,
						details: timerFormRef.current.elements.details.value,
						onDelete: handleDelete(newId),
					},
				},
			]

			setComponents(newComponents)
			window.localStorage.setItem("tics", JSON.stringify(newComponents))

			timerFormRef.current.reset()
		}
	}

	function handleCounterSubmit() {
		if (counterFormRef.current.elements.title.value) {
			counterModalRef.current.close()

			let newId = uuid()

			let newComponents = [
				...components,
				{
					name: "Counter",
					props: {
						id: newId,
						title: counterFormRef.current.elements.title.value,
						details: counterFormRef.current.elements.details.value,
						onDelete: handleDelete(newId),
					},
				},
			]

			setComponents(newComponents)
			window.localStorage.setItem("tics", JSON.stringify(newComponents))
			counterFormRef.current.reset()
		}
	}

	function handleStopwatchSubmit() {
		if (stopwatchFormRef.current.elements.title.value) {
			stopwatchModalRef.current.close()

			let newId = uuid()

			let newComponents = [
				...components,
				{
					name: "Stopwatch",
					props: {
						id: newId,
						title: stopwatchFormRef.current.elements.title.value,
						details:
							stopwatchFormRef.current.elements.details.value,
						onDelete: handleDelete(newId),
					},
				},
			]

			setComponents(newComponents)

			window.localStorage.setItem("tics", JSON.stringify(newComponents))

			stopwatchFormRef.current.reset()
		}
	}

	function handleCancel(ref, mode) {
		switch (mode) {
			case "timer":
				timerFormRef.current.reset()
				break
			case "counter":
				counterFormRef.current.reset()
				break
			case "stopwatch":
				stopwatchFormRef.current.reset()
				break
			default:
				break
		}

		ref.current.close()
	}

	function handleDelete(id) {
		let newComponents = components.filter((co) => co.props.id !== id)
		setComponents(newComponents)
	}

	function componentReturn(componentObject) {
		if (componentObject.name === "Timer") {
			return (
				<Timer
					title={componentObject.props.title}
					details={componentObject.props.details}
					id={componentObject.props.id}
					onDelete={() => handleDelete(componentObject.props.id)}
				/>
			)
		} else if (componentObject.name === "Counter") {
			return (
				<Counter
					title={componentObject.props.title}
					details={componentObject.props.details}
					id={componentObject.props.id}
					onDelete={() => handleDelete(componentObject.props.id)}
				/>
			)
		} else if (componentObject.name === "Stopwatch") {
			return (
				<Stopwatch
					title={componentObject.props.title}
					details={componentObject.props.details}
					id={componentObject.props.id}
					onDelete={() => handleDelete(componentObject.props.id)}
				/>
			)
		}
	}

	const stateTestRef = useRef()

	return (
		<React.StrictMode>
			<PageHeader />
			<div className="o-flex">
				<aside role="banner">
					<div className="o-flex column">
						<button
							key="timer"
							className="c-btn"
							onClick={handleTimer}
						>
							Add Timer
						</button>
						<button
							key="counter"
							className="c-btn"
							onClick={handleCounter}
						>
							Add Counter
						</button>
						<button
							key="stopwatch"
							className="c-btn"
							onClick={handleStopwatch}
						>
							Add Stopwatch
						</button>
					</div>
				</aside>

				<div className="o-container" ref={mainRef}>
					<div className="o-flex wrap">
						{components.map((component, index) => {
							// return component
							return (
								<div
									style={{display: "inline-block"}}
									key={index}
								>
									{componentReturn(component)}
								</div>
							)
						})}
					</div>
				</div>
			</div>

			<Dialog
				title="Enter a Timer Title"
				fields={[
					<div className="fld--col">
						<TextInputF
							ref={timerTitleRef}
							keyid="timerTitle"
							name="title"
							label="Timer Title"
							placeholder="Enter Timer Title"
							maxLength="16"
						/>
					</div>,
					<div className="fld--col">
						<TextArea
							keyid="timerArea"
							label="Details"
							name="details"
							style={{
								width: "90%",
								height: "100px",
								fontSize: "17px",
							}}
							placeholder="Details text will appear on the Timer below the time"
						/>
					</div>,
				]}
				formRef={timerFormRef}
				handleSubmit={handleTimerSubmit}
				handleCancel={(ref) => handleCancel(timerModalRef, "timer")}
				ref={timerModalRef}
				keyid="timerDialog"
			></Dialog>
			<Dialog
				title="Enter a Counter Title"
				fields={[
					<div className="fld--col">
						<TextInputF
							ref={counterTitleRef}
							keyid="counterTitle"
							name="title"
							label="Counter Title"
							placeholder="Enter Counter Title"
						/>
					</div>,
					<div className="fld--col">
						<TextArea
							keyid="counterArea"
							label="Details"
							name="details"
							style={{
								width: "90%",
								height: "100px",
								fontSize: "17px",
							}}
							placeholder="Details text will appear on the Counter"
						/>
					</div>,
				]}
				formRef={counterFormRef}
				handleSubmit={handleCounterSubmit}
				handleCancel={(ref) => handleCancel(counterModalRef, "counter")}
				ref={counterModalRef}
				keyid="counterDialog"
			></Dialog>
			<Dialog
				title="Enter a Stopwatch Title"
				fields={[
					<div className="fld--col">
						<TextInputF
							ref={stopwatchTitleRef}
							keyid="stopwatchTitle"
							name="title"
							label="Stopwatch Title"
							placeholder="Enter Stopwatch Title"
						/>
					</div>,
					<div className="fld--col">
						<TextArea
							keyid="stopwatchArea"
							label="Details"
							name="details"
							style={{
								width: "90%",
								height: "100px",
								fontSize: "17px",
							}}
							placeholder="Details text will appear below the time"
						/>
					</div>,
				]}
				formRef={stopwatchFormRef}
				handleSubmit={handleStopwatchSubmit}
				handleCancel={(ref) =>
					handleCancel(stopwatchModalRef, "stopwatch")
				}
				ref={stopwatchModalRef}
				keyid="stopwatchDialog"
			></Dialog>
		</React.StrictMode>
	)
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
