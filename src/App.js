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
	// used to get a live version of the state
	// so that I can delete child components
	const stateRef = useRef()

	let arr = []

	try {
		arr = JSON.parse(window.localStorage.getItem("tics"))
	} catch (err) {
		arr = []
	}

	const [components, setComponents] = useState(arr)

	useEffect(() => {
		stateRef.current = components
		window.localStorage.setItem("tics", JSON.stringify(stateRef.current))
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

			stateRef.current = newComponents

			window.localStorage.setItem(
				"tics",
				JSON.stringify(stateRef.current)
			)

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

			stateRef.current = newComponents

			window.localStorage.setItem(
				"tics",
				JSON.stringify(stateRef.current)
			)
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

			stateRef.current = newComponents

			window.localStorage.setItem(
				"tics",
				JSON.stringify(stateRef.current)
			)

			stopwatchFormRef.current.reset()
		}
	}

	function handleCancel(ref) {
		ref.current.close()
	}

	function handleDelete(id) {
		let newComponents = stateRef.current.filter((co) => co.props.id !== id)
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
						<button className="c-btn" onClick={handleTimer}>
							Add Timer
						</button>
						<button className="c-btn" onClick={handleCounter}>
							Add Counter
						</button>
						<button className="c-btn" onClick={handleStopwatch}>
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
							name="title"
							label="Timer Title"
							placeholder="Enter Timer Title"
						/>
					</div>,
					<div className="fld--col">
						<TextArea
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
				handleCancel={(ref) => handleCancel(timerModalRef)}
				ref={timerModalRef}
			></Dialog>
			<Dialog
				title="Enter a Counter Title"
				fields={[
					<div className="fld--col">
						<TextInputF
							ref={counterTitleRef}
							name="title"
							label="Counter Title"
							placeholder="Enter Counter Title"
						/>
					</div>,
					<div className="fld--col">
						<TextArea
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
				handleCancel={(ref) => handleCancel(counterModalRef)}
				ref={counterModalRef}
			></Dialog>
			<Dialog
				title="Enter a Stopwatch Title"
				fields={[
					<div className="fld--col">
						<TextInputF
							ref={stopwatchTitleRef}
							name="title"
							label="Stopwatch Title"
							placeholder="Enter Stopwatch Title"
						/>
					</div>,
					<div className="fld--col">
						<TextArea
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
				handleCancel={(ref) => handleCancel(stopwatchModalRef)}
				ref={stopwatchModalRef}
			></Dialog>
		</React.StrictMode>
	)
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)