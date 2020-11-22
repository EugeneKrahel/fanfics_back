import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCommentDate1606062860555 implements MigrationInterface {
    name = 'fixCommentDate1606062860555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT LOCALTIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP`);
    }

}
