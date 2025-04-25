import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1745497475015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "age" integer NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
