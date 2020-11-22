import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser1606080398587 implements MigrationInterface {
    name = 'updateUser1606080398587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "key" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "key"`);
    }

}
