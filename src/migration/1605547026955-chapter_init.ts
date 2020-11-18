import {MigrationInterface, QueryRunner} from "typeorm";

export class chapterInit1605547026955 implements MigrationInterface {
    name = 'chapterInit1605547026955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chapter"`);
    }

}
