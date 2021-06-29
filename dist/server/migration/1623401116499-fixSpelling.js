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
exports.fixSpelling1623401116499 = void 0;
class fixSpelling1623401116499 {
    constructor() {
        this.name = 'fixSpelling1623401116499';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "chores" RENAME COLUMN "asigneeURL" TO "assigneeURL"`);
            yield queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "asigneeURL" TO "assigneeURL"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "assigneeURL" TO "asigneeURL"`);
            yield queryRunner.query(`ALTER TABLE "chores" RENAME COLUMN "assigneeURL" TO "asigneeURL"`);
        });
    }
}
exports.fixSpelling1623401116499 = fixSpelling1623401116499;
