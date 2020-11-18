import {MigrationInterface, QueryRunner} from "typeorm";

export class chapterInit21605609361230 implements MigrationInterface {
    name = 'chapterInit21605609361230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" ADD "fanficId" integer`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_56bb2e199df14a8e09ba3a20335" FOREIGN KEY ("fanficId") REFERENCES "fanfic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_56bb2e199df14a8e09ba3a20335"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "fanficId"`);
    }

}
