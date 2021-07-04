"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
var type_graphql_1 = require("type-graphql");
var userSchema_1 = require("../schemas/userSchema");
var Users_1 = require("../entity/Users");
var userResolvers = /** @class */ (function () {
    function userResolvers() {
    }
    //SHOULD NOT BE USED IN PRODUCTION get all user
    userResolvers.prototype.getAllUsers = function () {
        return Users_1.Users.find();
    };
    //Get single user by their Email
    userResolvers.prototype.getUserByEmail = function (email) {
        return Users_1.Users.findOne({ where: { email: email } });
    };
    //Get all users in a with a house
    userResolvers.prototype.getUsersByHousekey = function (house_keys) {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllUsers()];
                    case 1:
                        allUsers = _a.sent();
                        result = allUsers.filter(function (user) {
                            if (user.house_keys === null) {
                                return;
                            }
                            var house_keysArr = JSON.parse(user.house_keys);
                            if (house_keysArr[0] === house_keys) {
                                return user;
                            }
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //To Create new User with empty room
    userResolvers.prototype.createUser = function (email, username, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Users_1.Users.insert({ email: email, username: username, isAdmin: isAdmin })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, email];
                }
            });
        });
    };
    //update the username of a user
    userResolvers.prototype.updateUsername = function (email, newUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameToBeUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Users_1.Users.findOne({ email: email })];
                    case 1:
                        usernameToBeUpdated = _a.sent();
                        if (!usernameToBeUpdated) {
                            return [2 /*return*/, "Username not found!"];
                        }
                        if (!usernameToBeUpdated) return [3 /*break*/, 3];
                        usernameToBeUpdated.username = newUsername;
                        return [4 /*yield*/, Users_1.Users.save(usernameToBeUpdated)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "username has been updated to " + usernameToBeUpdated.username];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userResolvers.prototype.updateUserPhoto = function (email, photo_url) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameToBeUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Users_1.Users.findOne({ email: email })];
                    case 1:
                        usernameToBeUpdated = _a.sent();
                        if (!usernameToBeUpdated) {
                            console.log("email.not.found");
                            return [2 /*return*/, "Email not found!"];
                        }
                        if (!usernameToBeUpdated) return [3 /*break*/, 3];
                        usernameToBeUpdated.photo_url = photo_url;
                        return [4 /*yield*/, Users_1.Users.save(usernameToBeUpdated)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "photo_url has been updated to " + usernameToBeUpdated.photo_url];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //To Add Rooms to User
    userResolvers.prototype.addToRoom = function (email, house_key) {
        return __awaiter(this, void 0, void 0, function () {
            var userToBeUpdated, userRoomKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Users_1.Users.findOne({ where: { email: email } })];
                    case 1:
                        userToBeUpdated = _a.sent();
                        if (!userToBeUpdated) {
                            console.error("User not found!");
                            return [2 /*return*/];
                        }
                        if (!JSON.parse(userToBeUpdated.house_keys)) return [3 /*break*/, 3];
                        userRoomKeys = JSON.parse(userToBeUpdated.house_keys);
                        userRoomKeys.push(house_key);
                        userToBeUpdated.house_keys = JSON.stringify(userRoomKeys);
                        return [4 /*yield*/, Users_1.Users.save(userToBeUpdated)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "Added more room!"];
                    case 3:
                        userToBeUpdated.house_keys = JSON.stringify([house_key]);
                        return [4 /*yield*/, Users_1.Users.save(userToBeUpdated)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, "Added room to user!"];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Query(function () { return [userSchema_1.User]; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], userResolvers.prototype, "getAllUsers", null);
    __decorate([
        type_graphql_1.Query(function () { return userSchema_1.User; }),
        __param(0, type_graphql_1.Arg("email")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], userResolvers.prototype, "getUserByEmail", null);
    __decorate([
        type_graphql_1.Query(function () { return [userSchema_1.User]; }),
        __param(0, type_graphql_1.Arg("house_keys")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], userResolvers.prototype, "getUsersByHousekey", null);
    __decorate([
        type_graphql_1.Mutation(function () { return String; }),
        __param(0, type_graphql_1.Arg('email')),
        __param(1, type_graphql_1.Arg('username')),
        __param(2, type_graphql_1.Arg('isAdmin')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Boolean]),
        __metadata("design:returntype", Promise)
    ], userResolvers.prototype, "createUser", null);
    __decorate([
        type_graphql_1.Mutation(function () { return String; }),
        __param(0, type_graphql_1.Arg('email')),
        __param(1, type_graphql_1.Arg('newUsername')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], userResolvers.prototype, "updateUsername", null);
    __decorate([
        type_graphql_1.Mutation(function () { return String; }),
        __param(0, type_graphql_1.Arg('email')),
        __param(1, type_graphql_1.Arg('photo_url')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], userResolvers.prototype, "updateUserPhoto", null);
    __decorate([
        type_graphql_1.Mutation(function () { return String; }),
        __param(0, type_graphql_1.Arg('email')),
        __param(1, type_graphql_1.Arg('house_key')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], userResolvers.prototype, "addToRoom", null);
    userResolvers = __decorate([
        type_graphql_1.Resolver()
    ], userResolvers);
    return userResolvers;
}());
exports.userResolvers = userResolvers;
