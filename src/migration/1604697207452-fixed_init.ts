import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedInit1604697207452 implements MigrationInterface {
    name = 'fixedInit1604697207452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(36) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fanfic" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "genre" character varying(36) NOT NULL, "authorId" integer, CONSTRAINT "PK_e3ca4426c321b25a64d78b691dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fanfics_tags" ("fanfic_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_fe310c73e3616222e6a780a98ff" PRIMARY KEY ("fanfic_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2cf727d69b099faf6068d5ccc" ON "fanfics_tags" ("fanfic_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_33c86662d9a914e13796c7b816" ON "fanfics_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "fanfic" ADD CONSTRAINT "FK_90f2dbad5fd8a20c4d1eb9f7b3b" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fanfics_tags" ADD CONSTRAINT "FK_b2cf727d69b099faf6068d5ccc8" FOREIGN KEY ("fanfic_id") REFERENCES "fanfic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fanfics_tags" ADD CONSTRAINT "FK_33c86662d9a914e13796c7b8168" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fanfics_tags" DROP CONSTRAINT "FK_33c86662d9a914e13796c7b8168"`);
        await queryRunner.query(`ALTER TABLE "fanfics_tags" DROP CONSTRAINT "FK_b2cf727d69b099faf6068d5ccc8"`);
        await queryRunner.query(`ALTER TABLE "fanfic" DROP CONSTRAINT "FK_90f2dbad5fd8a20c4d1eb9f7b3b"`);
        await queryRunner.query(`DROP INDEX "IDX_33c86662d9a914e13796c7b816"`);
        await queryRunner.query(`DROP INDEX "IDX_b2cf727d69b099faf6068d5ccc"`);
        await queryRunner.query(`DROP TABLE "fanfics_tags"`);
        await queryRunner.query(`DROP TABLE "fanfic"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
