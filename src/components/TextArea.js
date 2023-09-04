import React from "react"

export default function TextArea({
	name,
	label,
	className,
	placeholder,
	value,
	onFocus,
	style,
}) {
	return (
		<>
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
		</>
	)
}

// TextArea.defaultProps = {
// 	className: "e-input--primary",
// }
