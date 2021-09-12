import { Socket } from 'socket.io-client';
interface Service {
    name: String;
    handler: Function;
}
declare class RealSync {
    socket: Socket;
    services: Service[];
    constructor(host: string);
    service(name: string, args: any): Promise<unknown>;
    handler(): void;
    register(name: string, handler: Function): void;
}
export { RealSync };
//# sourceMappingURL=index.d.ts.map