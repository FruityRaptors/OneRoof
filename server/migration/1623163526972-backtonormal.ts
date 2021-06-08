import {MigrationInterface, QueryRunner} from "typeorm";

export class backtonormal1623163526972 implements MigrationInterface {
    name = 'backtonormal1623163526972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "completes" TO "complete"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "complete" TO "completes"`);
    }

}
