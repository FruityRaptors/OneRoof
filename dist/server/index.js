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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
var apollo_server_express_1 = require("apollo-server-express");
var database_1 = require("./database");
var express_1 = __importDefault(require("express"));
var type_graphql_1 = require("type-graphql");
var userResolvers_1 = require("./resolvers/userResolvers");
var todoResolvers_1 = require("./resolvers/todoResolvers");
var houseResolvers_1 = require("./resolvers/houseResolvers");
var dmResolvers_1 = require("./resolvers/dmResolvers");
var choreResolvers_1 = require("./resolvers/choreResolvers");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, err_1, apolloServer, _a, port;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("spinning up express");
                app = express_1.default();
                app.enable('trust proxy');
                console.log("connecting to SQL database");
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, database_1.connectDB()];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4:
                console.log('Starting Apollo Server');
                _a = apollo_server_express_1.ApolloServer.bind;
                _b = {};
                return [4 /*yield*/, type_graphql_1.buildSchema({
                        resolvers: [userResolvers_1.userResolvers, todoResolvers_1.todoResolvers, houseResolvers_1.houseResolvers, choreResolvers_1.choreResolvers, dmResolvers_1.dmResolvers],
                        validate: true
                    })];
            case 5:
                apolloServer = new (_a.apply(apollo_server_express_1.ApolloServer, [void 0, (_b.schema = _c.sent(),
                        _b.context = function (_a) {
                            var req = _a.req, res = _a.res;
                            return ({ req: req, res: res });
                        },
                        _b)]))();
                apolloServer.applyMiddleware({ app: app, cors: false });
                port = process.env.PORT || 8080;
                console.log('launching server...');
                app.listen(port, function () {
                    console.log("server started at http://localhost:" + port + "/");
                });
                return [2 /*return*/];
        }
    });
}); })();
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
// connectDB().then(async connection => {
//     //create express app
//     express();
//     app.use(bodyParser.json());
//     let user = new Users();
//     user.username = "test subject"
//     user.house_key = "super secured house key"
//     user.email = "sephiroth69xx@gmail.com"
//     user.isAdmin = false
//     return connection.manager
//     .save(user)})
//     .then(user => {
//         console.log ('god tier has been saved')
//     //run app
//     app.listen(PORT);    
//     console.log(`Express application is up and running on port ${PORT}`)
// }).catch(error => console.log(`TypeORM connection error: ${error}`));
