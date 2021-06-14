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
exports.todoResolvers = void 0;
const type_graphql_1 = require("type-graphql");
const Todos_1 = require("../entity/Todos");
// import { Todo } from '../schemas/todoSchema'
let todoResolvers = class todoResolvers {
    getAllTodos() {
        return Todos_1.Todos.find();
    }
    getTodosByHouse(house_key) {
        return Todos_1.Todos.find({ where: { house_key } });
    }
    //Create new Todo. Need to add category(?)
    createTodo(todo, //Manual input
    date, //Assign Automatically using JS date
    victimid, //From Assignee dropdown(?)
    creatorid, //Automatic from user who created todo?
    complete, //For strikethrough/highglights
    house_key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Todos_1.Todos.insert({ todo, house_key, date, victimid, creatorid, complete });
            return "New Todo Added!";
        });
    }
    //Delete a todo by id
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Todos_1.Todos.delete(id);
            return "Todo deleted!";
        });
    }
    //Update a todo by it's ID
    updateTodoVictim(id, victimid) {
        return __awaiter(this, void 0, void 0, function* () {
            let todoToBeUpdated = yield Todos_1.Todos.findOne({ where: { id } });
            if (!todoToBeUpdated) {
                console.log('Error!');
                return;
            }
            todoToBeUpdated.victimid = victimid;
            Todos_1.Todos.save(todoToBeUpdated);
            return "Saved!";
        });
    }
    //Update a todo's message
    updateTodoMessage(id, todo) {
        return __awaiter(this, void 0, void 0, function* () {
            let todoToBeUpdated = yield Todos_1.Todos.findOne({ where: { id } });
            if (!todoToBeUpdated) {
                console.log('Error!');
                return;
            }
            todoToBeUpdated.todo = todo;
            Todos_1.Todos.save(todoToBeUpdated);
            return "Saved!";
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Todos_1.Todos]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], todoResolvers.prototype, "getAllTodos", null);
__decorate([
    type_graphql_1.Query(() => [Todos_1.Todos]),
    __param(0, type_graphql_1.Arg('house_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], todoResolvers.prototype, "getTodosByHouse", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('todo')),
    __param(1, type_graphql_1.Arg('date')),
    __param(2, type_graphql_1.Arg('victimid')),
    __param(3, type_graphql_1.Arg('creatorid')),
    __param(4, type_graphql_1.Arg('complete')),
    __param(5, type_graphql_1.Arg('house_key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], todoResolvers.prototype, "createTodo", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], todoResolvers.prototype, "deleteTodo", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('victimid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], todoResolvers.prototype, "updateTodoVictim", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('todo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], todoResolvers.prototype, "updateTodoMessage", null);
todoResolvers = __decorate([
    type_graphql_1.Resolver()
], todoResolvers);
exports.todoResolvers = todoResolvers;
