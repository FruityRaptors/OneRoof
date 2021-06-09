import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1623196025240 implements MigrationInterface {
    name = 'firstMigration1623196025240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "houses" ADD "modules" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "houses" DROP COLUMN "modules"`);
    }

}
