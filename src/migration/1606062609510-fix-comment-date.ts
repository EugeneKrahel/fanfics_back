import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCommentDate1606062609510 implements MigrationInterface {
    name = 'fixCommentDate1606062609510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "lastUpdate" TO "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "date" TO "lastUpdate"`);
    }

}
