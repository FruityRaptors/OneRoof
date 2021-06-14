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
exports.Todo = void 0;
const type_graphql_1 = require("type-graphql");
let Todo = class Todo {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Todo.prototype, "chore", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Todo.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Todo.prototype, "house_key", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Todo.prototype, "assignee", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Todo.prototype, "creatorid", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Todo.prototype, "assigneeURL", void 0);
Todo = __decorate([
    type_graphql_1.ObjectType()
], Todo);
exports.Todo = Todo;
