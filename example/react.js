import { useEffect } from 'react'
import { RealSync } from '@realsync/react'
const realsync = new RealSync('http://localhost:8080')

function App() {
	useEffect(() => {
		// this will register services

		realsync.register('profile/firstname', () => {
			return prompt('Enter first name')
		})

		realsync.register('profile/lastname', () => {
			return prompt('Enter last name')
		})
	}, [])

	const Start = async () => {
		const profile = await realsync.service('profile/setup')
		console.log('profile', profile)
	}

	return (
		<div>
			<button onClick={Start}>Start</button>
		</div>
	)
}

export default App
