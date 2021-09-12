import SocketIO, { Socket } from 'socket.io-client'
import * as shortid from 'shortid'

interface Service {
	name: String
	handler: Function
}

class RealSync {
	socket: Socket
	services: Service[] = []

	constructor(host: string) {
		this.socket = SocketIO(host)
		this.handler()
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

	handler() {
		this.socket.on('rs-run', async (data) => {
			const { name, key } = data
			const _service = this.services.find((service) => service.name === name)
			if (_service) {
				const response = await _service.handler()
				this.socket.emit('rs-answer', {
					key,
					response,
				})
			}
		})
	}

	register(name: string, handler: Function) {
		this.services.push({ name, handler })
	}
}
export { RealSync }
