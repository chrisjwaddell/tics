import React, {useRef, forwardRef} from "react"
import {createPortal} from "react-dom"

import Form from "./FormDialog.js"

const Dialog = forwardRef((props, ref) => {
	function handleClose() {
		ref.current.classList.remove("overflow-hidden")
		ref.current.close()
	}

	return createPortal(
		<dialog ref={ref} className="modal" key={props.keyid}>
			<div className="modal__top" key="top">
				<h3 className="modal__title">{props.title}</h3>
				<div className="c-close" onClick={props.handleCancel}>
					<div className="c-close__container"></div>
				</div>
			</div>
			<div className="modal__container" key="container">
				<Form
					ref={props.formRef}
					method={"dialog"}
					fields={props.fields.map((el, idx) => el)}
				/>
				<div className="modal__buttons">
					<button
						className="c-btn c-btn--primary save"
						onClick={props.handleSubmit}
					>
						Save
					</button>
					<button
						className="c-btn c-btn--secondary cancel"
						onClick={props.handleCancel}
					>
						Cancel
					</button>
				</div>
			</div>
		</dialog>,
		document.getElementById("modal")
	)
})

export default Dialog
