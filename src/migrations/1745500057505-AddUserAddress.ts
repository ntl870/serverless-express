import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAddress1745500057505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "user" 
                ADD COLUMN "address" character varying
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "user" 
                DROP COLUMN "address"
            `);
  }
}
