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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var type_graphql_1 = require("type-graphql");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        type_graphql_1.Field(function () { return Number; }),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }, { nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "house_keys", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }, { nullable: true, }),
        __metadata("design:type", String)
    ], User.prototype, "photo_url", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Boolean; }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isAdmin", void 0);
    User = __decorate([
        type_graphql_1.ObjectType()
    ], User);
    return User;
}());
exports.User = User;
