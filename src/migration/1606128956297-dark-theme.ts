import {MigrationInterface, QueryRunner} from "typeorm";

export class darkTheme1606128956297 implements MigrationInterface {
    name = 'darkTheme1606128956297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "key" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "unicornDarkTheme" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "unicornDarkTheme"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "key" character varying(255)`);
    }

}
