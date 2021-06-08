"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Todos = void 0;
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var Todos = /** @class */ (function (_super) {
    __extends(Todos, _super);
    function Todos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Todos.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column({
            length: 200
        }),
        __metadata("design:type", String)
    ], Todos.prototype, "todo", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column({
            length: 50
        }),
        __metadata("design:type", String)
    ], Todos.prototype, "house_key", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todos.prototype, "date", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; })
        // @OneToOne(() => Users)
        // victimid: Users["username"]
        ,
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todos.prototype, "victimid", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; })
        // @OneToOne(() => Users)
        // creatorid: Users["username"]
        ,
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todos.prototype, "creatorid", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Boolean; }),
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Todos.prototype, "complete", void 0);
    Todos = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], Todos);
    return Todos;
}(typeorm_1.BaseEntity));
exports.Todos = Todos;
