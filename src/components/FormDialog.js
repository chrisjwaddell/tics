import React, {forwardRef} from "react"

const Form = forwardRef((props, ref) => {
	return (
		<form ref={ref} method={props.method}>
			<div className="o-flex column">{props.fields}</div>
		</form>
	)
})

export default Form
