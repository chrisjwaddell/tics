import React from "react"

export default function TextArea({
	name,
	keyid,
	label,
	className,
	placeholder,
	value,
	onFocus,
	style,
}) {
	return (
		<div key={keyid}>
			<label htmlFor={name} className="fld-label">
				{label}
			</label>
			<textarea
				id={name}
				name={name}
				className={className}
				placeholder={placeholder}
				onFocus={onFocus}
				value={value}
				style={style}
			></textarea>
		</div>
	)
}

// TextArea.defaultProps = {
// 	className: "e-input--primary",
// }
