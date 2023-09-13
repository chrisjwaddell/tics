import React, {forwardRef} from "react"

export function TextInput({
	name,
	label,
	keyid,
	className,
	placeholder,
	value,
	onFocus,
	onChange,
}) {
	return (
		<div key={keyid}>
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
				maxLength={props.maxLength}
				value={value}
			></input>
		</div>
	)
}

export const TextInputF = forwardRef((props, ref) => {
	return (
		<div key={props.keyid}>
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
				maxLength={props.maxLength}
				value={props.value}
			></input>
		</div>
	)
})

TextInput.defaultProps = {
	className: "e-input--primary",
}

TextInputF.defaultProps = {
	className: "e-input--primary",
}
