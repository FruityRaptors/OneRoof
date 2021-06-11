import {MigrationInterface, QueryRunner} from "typeorm";

export class addAssigneeURL1623400861820 implements MigrationInterface {
    name = 'addAssigneeURL1623400861820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chores" ADD "asigneeURL" character varying`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "asigneeURL" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "asigneeURL"`);
        await queryRunner.query(`ALTER TABLE "chores" DROP COLUMN "asigneeURL"`);
    }

}
