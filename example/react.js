// Note: This is just a sample code

import { RealSync } from '@realsync/react'
const realsync = new RealSync('http://localhost:8080')

function App() {
	const Sum = async () => {
		const sum = await realsync.service('add', [2, 3])
		console.log(sum)
	}

	return (
		<div>
			<button onClick={Sum}>Sum</button>
		</div>
	)
}

export default App
