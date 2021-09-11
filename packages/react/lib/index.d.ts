import { Socket } from 'socket.io-client';
declare class RealSync {
    socket: Socket;
    constructor(host: string);
    service(name: string, args: any): Promise<unknown>;
}
export { RealSync };
//# sourceMappingURL=index.d.ts.map