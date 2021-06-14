import {MigrationInterface, QueryRunner} from "typeorm";

export class fixSpelling1623401116499 implements MigrationInterface {
    name = 'fixSpelling1623401116499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chores" RENAME COLUMN "asigneeURL" TO "assigneeURL"`);
        await queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "asigneeURL" TO "assigneeURL"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "assigneeURL" TO "asigneeURL"`);
        await queryRunner.query(`ALTER TABLE "chores" RENAME COLUMN "assigneeURL" TO "asigneeURL"`);
    }

}
