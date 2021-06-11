import {MigrationInterface, QueryRunner} from "typeorm";

export class moved1623290408980 implements MigrationInterface {
    name = 'moved1623290408980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chores" ("id" SERIAL NOT NULL, "chore" character varying(200) NOT NULL, "description" character varying(1000), "house_key" character varying(50) NOT NULL, "assignee" character varying, "creatorid" character varying NOT NULL, CONSTRAINT "PK_943e6520135dee468bed5a16181" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "d_ms" ("id" SERIAL NOT NULL, "dm_key" character varying NOT NULL, "users" character varying NOT NULL, CONSTRAINT "PK_8c923c71f2edc797e989e850d5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "houses" ADD "modules" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "houses" DROP COLUMN "modules"`);
        await queryRunner.query(`DROP TABLE "d_ms"`);
        await queryRunner.query(`DROP TABLE "chores"`);
    }

}
