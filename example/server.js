// Note: This is just a sample code. Run `node server.js`

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
