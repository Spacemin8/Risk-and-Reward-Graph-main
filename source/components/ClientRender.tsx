import { useEffect, useState } from "react"

const ClientRender = ({ ...props }) => {
	const [showComponent, setShowComponent] = useState(false)
	useEffect(() => {
		setShowComponent(true)
	}, [])

	if (!showComponent) return <></>
	else return props.children
}
export default ClientRender