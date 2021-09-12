// Note: This is just a sample code. Run `node server.js`

const http = require('http')
const app = http.createServer()
const { RealSync } = require('../packages/server/lib')

const realsync = new RealSync(app, '*')

realsync.register('profile/setup', async (client) => {
	const firstName = await client.run('profile/firstname')
	const lastName = await client.run('profile/lastname')

	return { firstName, lastName }
})

app.listen(8080, () => {
	console.log('8080')
})
