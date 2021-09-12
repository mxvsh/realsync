import SocketIO from 'socket.io';
interface Client {
    __socket: SocketIO.Socket;
    run: (q: string, args: any) => Promise<any>;
}
declare type ServiceHandler = (client: Client, ...args: any) => any;
interface Service {
    name: String;
    handler: ServiceHandler;
}
declare class RealSync {
    private io;
    services: Service[];
    /**
     * @param server HTTP Server instance
     * @param origin Allowed origins
     */
    constructor(server: any, origin?: string | string[]);
    register(name: string, handler: ServiceHandler): void;
    private handler;
}
export { RealSync };
//# sourceMappingURL=index.d.ts.map