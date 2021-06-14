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
exports.moved1623290408980 = void 0;
class moved1623290408980 {
    constructor() {
        this.name = 'moved1623290408980';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "chores" ("id" SERIAL NOT NULL, "chore" character varying(200) NOT NULL, "description" character varying(1000), "house_key" character varying(50) NOT NULL, "assignee" character varying, "creatorid" character varying NOT NULL, CONSTRAINT "PK_943e6520135dee468bed5a16181" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "d_ms" ("id" SERIAL NOT NULL, "dm_key" character varying NOT NULL, "users" character varying NOT NULL, CONSTRAINT "PK_8c923c71f2edc797e989e850d5a" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "houses" ADD "modules" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "houses" DROP COLUMN "modules"`);
            yield queryRunner.query(`DROP TABLE "d_ms"`);
            yield queryRunner.query(`DROP TABLE "chores"`);
        });
    }
}
exports.moved1623290408980 = moved1623290408980;
