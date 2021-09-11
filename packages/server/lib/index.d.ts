interface Service {
    name: String;
    handler: Function;
}
declare class RealSync {
    private io;
    services: Service[];
    /**
     * @param server HTTP Server instance
     * @param origin Allowed origins
     */
    constructor(server: any, origin?: string | string[]);
    register(name: string, handler: Function): void;
    private handler;
}
export { RealSync };
//# sourceMappingURL=index.d.ts.map