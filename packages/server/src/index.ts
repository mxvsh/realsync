import SocketIO from 'socket.io'
import shortid from 'shortid'

export interface Client {
	__socket: SocketIO.Socket
	run: (q: string, args: any) => Promise<any>
}

export type ServiceHandler = (client: Client, ...args: any) => any
export interface Service {
	name: String
	handler: ServiceHandler
}

export interface SocketService {
	service: string
	args: String | Number | any[] | any
	__id: string
}

class RealSync {
	private io: SocketIO.Server
	services: Service[] = []

	/**
	 * @param server HTTP Server instance
	 * @param origin Allowed origins
	 */
	constructor(server: any, origin: string | string[] = '*') {
		this.io = new SocketIO.Server(server, {
			cors: {
				origin: origin,
			},
		})

		this.io.on('connection', (socket) => {
			this.handler(socket)
		})
	}

	register(name: string, handler: ServiceHandler) {
		this.services.push({
			name,
			handler,
		})
	}

	private handler(socket: SocketIO.Socket) {
		let client: Client = {
			__socket: socket,

			// run a service on client side and wait for response
			run: async (name: string, args?: any) => {
				const __id = shortid.generate()
				const __key = `${__id}-${name}`

				socket.emit('rs-run', {
					key: __key,
					name,
					args,
				})

				return new Promise((resolve) => {
					socket.on('rs-answer', (data) => {
						const { key, response } = data

						if (key == __key) {
							resolve(response)
						}
					})
				})
			},
		}

		socket.on('rs-service', async (data: SocketService) => {
			const { service: serviceName, args, __id } = data
			const service = this.services.find((srv) => srv.name === serviceName)

			const key = `rs-service-${__id}`
			try {
				let response

				if (Array.isArray(args)) {
					response = await service?.handler(client, ...args)
				} else {
					response = await service?.handler(client, args)
				}

				socket.emit(`${key}-resolve`, response)
			} catch (e: any) {
				socket.emit(`${key}-reject`, e.toString())
			}
		})
	}
}

export { RealSync }
