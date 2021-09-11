import SocketIO, { Socket } from 'socket.io-client'
import * as shortid from 'shortid'

class RealSync {
	socket: Socket
	constructor(host: string) {
		this.socket = SocketIO(host)
	}

	async service(name: string, args: any) {
		const id = shortid.generate()
		const key = `rs-service-${id}`

		this.socket.emit('rs-service', { service: name, args, __id: id })

		return new Promise((resolve, reject) => {
			this.socket.on(`${key}-resolve`, resolve)
			this.socket.on(`${key}-reject`, reject)
		})
	}
}
export { RealSync }
