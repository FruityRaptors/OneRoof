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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const type_graphql_1 = require("type-graphql");
const userSchema_1 = require("../schemas/userSchema");
const Users_1 = require("../entity/Users");
let userResolvers = class userResolvers {
    //SHOULD NOT BE USED IN PRODUCTION get all user
    getAllUsers() {
        return Users_1.Users.find();
    }
    //Get single user by their Email
    getUserByEmail(email) {
        return Users_1.Users.findOne({ where: { email } });
    }
    //Get all users in a with a house
    getUsersByHousekey(house_keys) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUsers = yield this.getAllUsers();
            let result = allUsers.filter((user) => {
                if (user.house_keys === null) {
                    return;
                }
                let house_keysArr = JSON.parse(user.house_keys);
                if (house_keysArr[0] === house_keys) {
                    return user;
                }
            });
            return result;
        });
    }
    //To Create new User with empty room
    createUser(email, username, isAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Users_1.Users.insert({ email, username, isAdmin });
            return email;
        });
    }
    //update the username of a user
    updateUsername(email, newUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameToBeUpdated = yield Users_1.Users.findOne({ email });
            if (!usernameToBeUpdated) {
                return "Username not found!";
            }
            if (usernameToBeUpdated) {
                usernameToBeUpdated.username = newUsername;
                yield Users_1.Users.save(usernameToBeUpdated);
                return `username has been updated to ${usernameToBeUpdated.username}`;
            }
        });
    }
    updateUserPhoto(email, photo_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameToBeUpdated = yield Users_1.Users.findOne({ email });
            if (!usernameToBeUpdated) {
                console.log("email.not.found");
                return "Email not found!";
            }
            if (usernameToBeUpdated) {
                usernameToBeUpdated.photo_url = photo_url;
                yield Users_1.Users.save(usernameToBeUpdated);
                return `photo_url has been updated to ${usernameToBeUpdated.photo_url}`;
            }
        });
    }
    //To Add Rooms to User
    addToRoom(email, house_key) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToBeUpdated = yield Users_1.Users.findOne({ where: { email } });
            if (!userToBeUpdated) {
                console.error("User not found!");
                return;
            }
            if (JSON.parse(userToBeUpdated.house_keys)) {
                const userRoomKeys = JSON.parse(userToBeUpdated.house_keys);
                userRoomKeys.push(house_key);
                userToBeUpdated.house_keys = JSON.stringify(userRoomKeys);
                yield Users_1.Users.save(userToBeUpdated);
                return "Added more room!";
            }
            else {
                userToBeUpdated.house_keys = JSON.stringify([house_key]);
                yield Users_1.Users.save(userToBeUpdated);
                return "Added room to user!";
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [userSchema_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], userResolvers.prototype, "getAllUsers", null);
__decorate([
    type_graphql_1.Query(() => userSchema_1.User),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], userResolvers.prototype, "getUserByEmail", null);
__decorate([
    type_graphql_1.Query(() => [userSchema_1.User]),
    __param(0, type_graphql_1.Arg("house_keys")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userResolvers.prototype, "getUsersByHousekey", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('username')),
    __param(2, type_graphql_1.Arg('isAdmin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], userResolvers.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('newUsername')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], userResolvers.prototype, "updateUsername", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('photo_url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], userResolvers.prototype, "updateUserPhoto", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('house_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], userResolvers.prototype, "addToRoom", null);
userResolvers = __decorate([
    type_graphql_1.Resolver()
], userResolvers);
exports.userResolvers = userResolvers;
