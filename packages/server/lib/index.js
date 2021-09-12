"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealSync = void 0;
var socket_io_1 = __importDefault(require("socket.io"));
var shortid_1 = __importDefault(require("shortid"));
var RealSync = /** @class */ (function () {
    /**
     * @param server HTTP Server instance
     * @param origin Allowed origins
     */
    function RealSync(server, origin) {
        var _this = this;
        if (origin === void 0) { origin = '*'; }
        this.services = [];
        this.io = new socket_io_1.default.Server(server, {
            cors: {
                origin: origin,
            },
        });
        this.io.setMaxListeners(0);
        this.io.on('connection', function (socket) {
            _this.handler(socket);
        });
    }
    RealSync.prototype.register = function (name, handler) {
        this.services.push({
            name: name,
            handler: handler,
        });
    };
    RealSync.prototype.handler = function (socket) {
        var _this = this;
        var client = {
            __socket: socket,
            // run a service on client side and wait for response
            run: function (name, args) { return __awaiter(_this, void 0, void 0, function () {
                var __id, __key;
                return __generator(this, function (_a) {
                    __id = shortid_1.default.generate();
                    __key = __id + "-" + name;
                    socket.emit('rs-run', {
                        key: __key,
                        name: name,
                        args: args,
                    });
                    return [2 /*return*/, new Promise(function (resolve) {
                            socket.on('rs-answer', function (data) {
                                var key = data.key, response = data.response;
                                if (key == __key) {
                                    resolve(response);
                                }
                            });
                        })];
                });
            }); },
        };
        socket.on('rs-service', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var serviceName, args, __id, service, key, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serviceName = data.service, args = data.args, __id = data.__id;
                        service = this.services.find(function (srv) { return srv.name === serviceName; });
                        key = "rs-service-" + __id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        response = void 0;
                        if (!Array.isArray(args)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (service === null || service === void 0 ? void 0 : service.handler.apply(service, __spreadArray([client], args, false)))];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, (service === null || service === void 0 ? void 0 : service.handler(client, args))];
                    case 4:
                        response = _a.sent();
                        _a.label = 5;
                    case 5:
                        socket.emit(key + "-resolve", response);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        socket.emit(key + "-reject", e_1.toString());
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    return RealSync;
}());
exports.RealSync = RealSync;
//# sourceMappingURL=index.js.map