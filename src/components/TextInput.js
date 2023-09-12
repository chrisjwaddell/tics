import React, {forwardRef} from "react"

export function TextInput({
	name,
	label,
	className,
	placeholder,
	value,
	onFocus,
	onChange,
}) {
	return (
		<>
			<label htmlFor={name} className="fld-label">
				{label}
			</label>
			<input
				id={name}
				type="text"
				name={name}
				className={className}
				placeholder={placeholder}
				onFocus={onFocus}
				onChange={onChange}
				value={value}
			></input>
		</>
	)
}

export const TextInputF = forwardRef((props, ref) => {
	return (
		<>
			<label htmlFor={props.name} className="fld-label">
				{props.label}
			</label>
			<input
				id={props.name}
				ref={ref}
				type="text"
				name={props.name}
				className={props.className}
				placeholder={props.placeholder}
				onFocus={props.onFocus}
				onChange={props.onChange}
				value={props.value}
			></input>
		</>
	)
})

TextInput.defaultProps = {
	className: "e-input--primary",
}

TextInputF.defaultProps = {
	className: "e-input--primary",
}
