
# RealSync
> Execute Server Functions from Client side

![banner](https://user-images.githubusercontent.com/31907722/132945785-42b90eea-9066-44d9-a84d-1bec4f9e60a7.png)

## Usage

### Server
Here is a sample code for your Server, you can use Express if you want.
```javascript
const http = require('http')

const app = http.createServer()

const { RealSync } = require('../packages/server/lib')

const realsync = new RealSync(app, '*')

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

realsync.register('add', async (a, b) => {
	const sum = a + b
	
	// Sleep 2 seconds, then return the answer [async]
	await sleep(2000)
	
	return 'sum = ' + sum

})

app.listen(8080, () => {
	console.log('8080')
})
```

### Client
```js
// React Example 
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
```
