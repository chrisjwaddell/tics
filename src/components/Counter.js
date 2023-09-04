import React, {useState, useRef, useEffect} from "react"

function Counter({title, details, id, onDelete}) {
	const [count, setCount] = useState(0)

	const controlRef = useRef()

	return (
		<div
			id={id}
			ref={controlRef}
			className="gadget-container counter corner"
		>
			<div className="gadget-container__top">
				<h2>COUNTER</h2>
				<div className="c-close">
					<div
						className="c-close__container"
						onClick={() => onDelete(id)}
					></div>
				</div>
			</div>

			<h3>{title}</h3>
			<div className="counter__count">
				<p>{count}</p>
			</div>
			<div className="gadget-container__details">
				<p>{details}</p>
			</div>
			<div className="o-flex">
				<button
					className="counter__dec corner"
					onClick={() => setCount((n) => n - 1)}
				>
					-
				</button>
				<button
					className="counter__inc corner"
					onClick={() => setCount((n) => n + 1)}
				>
					+
				</button>
			</div>
			<div className="o-flex">
				<button
					className="counter__clear corner"
					onClick={() => {
						if (confirm("Are you sure?")) setCount(0)
					}}
				>
					Clear
				</button>
			</div>
		</div>
	)
}

export default Counter
