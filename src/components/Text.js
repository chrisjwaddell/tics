import React from "react"

export default function Text({ title, placeholder }) {
	return (
		<>
			<label className="fld-label">{title}</label>
			<input type="text" className="e-input--primary" placeholder={placeholder}></input>
		</>
	)
}
