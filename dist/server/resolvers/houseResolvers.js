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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseResolvers = void 0;
const type_graphql_1 = require("type-graphql");
const houseSchema_1 = require("../schemas/houseSchema");
const Houses_1 = require("../entity/Houses");
const modules_json_1 = __importDefault(require("../modules.json"));
let houseResolvers = class houseResolvers {
    getHouseName(house_key) {
        return Houses_1.Houses.findOne({ where: { house_key } });
    }
    createHouseWithName(house_name, house_key) {
        return __awaiter(this, void 0, void 0, function* () {
            let modules = JSON.stringify(modules_json_1.default);
            yield Houses_1.Houses.insert({ house_name, house_key, modules });
            return `${house_name} has been added to database!`;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => houseSchema_1.House),
    __param(0, type_graphql_1.Arg("house_key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], houseResolvers.prototype, "getHouseName", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("house_name")),
    __param(1, type_graphql_1.Arg("house_key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], houseResolvers.prototype, "createHouseWithName", null);
houseResolvers = __decorate([
    type_graphql_1.Resolver()
], houseResolvers);
exports.houseResolvers = houseResolvers;
