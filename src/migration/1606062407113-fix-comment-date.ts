import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCommentDate1606062407113 implements MigrationInterface {
    name = 'fixCommentDate1606062407113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "date" TO "lastUpdate"`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "lastUpdate" SET DEFAULT LOCALTIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "lastUpdate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "lastUpdate" TO "date"`);
    }

}
