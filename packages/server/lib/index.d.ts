import SocketIO from 'socket.io';
export interface Client {
    __socket: SocketIO.Socket;
    run: (q: string, args?: any) => Promise<any>;
}
export declare type ServiceHandler = (client: Client, ...args: any) => any;
export interface Service {
    name: String;
    handler: ServiceHandler;
}
export interface SocketService {
    service: string;
    args: String | Number | any[] | any;
    __id: string;
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