import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEmail1747832383819 implements MigrationInterface {
    name = 'AddUserEmail1747832383819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
