import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommentDate1606060482717 implements MigrationInterface {
    name = 'addCommentDate1606060482717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
    }

}
