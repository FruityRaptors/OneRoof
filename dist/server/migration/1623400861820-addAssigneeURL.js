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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAssigneeURL1623400861820 = void 0;
class addAssigneeURL1623400861820 {
    constructor() {
        this.name = 'addAssigneeURL1623400861820';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "chores" ADD "asigneeURL" character varying`);
            yield queryRunner.query(`ALTER TABLE "todos" ADD "asigneeURL" character varying`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "asigneeURL"`);
            yield queryRunner.query(`ALTER TABLE "chores" DROP COLUMN "asigneeURL"`);
        });
    }
}
exports.addAssigneeURL1623400861820 = addAssigneeURL1623400861820;
