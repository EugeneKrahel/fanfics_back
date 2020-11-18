import {MigrationInterface, QueryRunner} from "typeorm";

export class newInit1605711986606 implements MigrationInterface {
    name = 'newInit1605711986606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fanfic" DROP CONSTRAINT "FK_90f2dbad5fd8a20c4d1eb9f7b3b"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_56bb2e199df14a8e09ba3a20335"`);
        await queryRunner.query(`ALTER TABLE "fanfic" ADD CONSTRAINT "FK_90f2dbad5fd8a20c4d1eb9f7b3b" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_56bb2e199df14a8e09ba3a20335" FOREIGN KEY ("fanficId") REFERENCES "fanfic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_56bb2e199df14a8e09ba3a20335"`);
        await queryRunner.query(`ALTER TABLE "fanfic" DROP CONSTRAINT "FK_90f2dbad5fd8a20c4d1eb9f7b3b"`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_56bb2e199df14a8e09ba3a20335" FOREIGN KEY ("fanficId") REFERENCES "fanfic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fanfic" ADD CONSTRAINT "FK_90f2dbad5fd8a20c4d1eb9f7b3b" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
