import SocketIO from 'socket.io'

interface Service {
	name: String
	handler: Function
}

interface SocketService {
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

	register(name: string, handler: Function) {
		this.services.push({ name, handler })
	}

	private handler(socket: SocketIO.Socket) {
		socket.on('rs-service', async (data: SocketService) => {
			const { service: serviceName, args, __id } = data
			const service = this.services.find((srv) => srv.name === serviceName)

			const key = `rs-service-${__id}`
			try {
				const response = await service?.handler(...args)
				socket.emit(`${key}-resolve`, response)
			} catch (e: any) {
				socket.emit(`${key}-reject`, e.toString())
			}
		})
	}
}

export { RealSync }
