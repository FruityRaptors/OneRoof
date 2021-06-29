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
exports.choreResolvers = void 0;
const type_graphql_1 = require("type-graphql");
const Chores_1 = require("../entity/Chores");
let choreResolvers = class choreResolvers {
    getAllChores() {
        return Chores_1.Chores.find();
    }
    getChoresByHouse(house_key) {
        return Chores_1.Chores.find({ where: { house_key } });
    }
    createChore(chore, description, assignee, creatorid, house_key, assigneeURL) {
        Chores_1.Chores.insert({ chore, house_key, description, assignee, creatorid, assigneeURL });
        return "New chore Added!";
    }
    deleteChore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Chores_1.Chores.delete(id);
            return "Chore deleted!";
        });
    }
    updateChoreAssignee(id, newAssignee, assigneeURL) {
        return __awaiter(this, void 0, void 0, function* () {
            let choreToBeUpdated = yield Chores_1.Chores.findOne({ where: { id } });
            if (!choreToBeUpdated) {
                console.log('Error!');
                return;
            }
            choreToBeUpdated.assignee = newAssignee;
            choreToBeUpdated.assigneeURL = assigneeURL;
            Chores_1.Chores.save(choreToBeUpdated);
            return "Saved!";
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Chores_1.Chores]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], choreResolvers.prototype, "getAllChores", null);
__decorate([
    type_graphql_1.Query(() => [Chores_1.Chores]),
    __param(0, type_graphql_1.Arg('house_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], choreResolvers.prototype, "getChoresByHouse", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('chore')),
    __param(1, type_graphql_1.Arg('description')),
    __param(2, type_graphql_1.Arg('assignee')),
    __param(3, type_graphql_1.Arg('creatorid')),
    __param(4, type_graphql_1.Arg('house_key')),
    __param(5, type_graphql_1.Arg('assigneeURL')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], choreResolvers.prototype, "createChore", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], choreResolvers.prototype, "deleteChore", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('newAssignee')),
    __param(2, type_graphql_1.Arg('assigneeURL')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], choreResolvers.prototype, "updateChoreAssignee", null);
choreResolvers = __decorate([
    type_graphql_1.Resolver()
], choreResolvers);
exports.choreResolvers = choreResolvers;
