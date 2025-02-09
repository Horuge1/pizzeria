import { MigrationInterface, QueryRunner } from "typeorm";

export class ALTERTOPPINGANDPIZZATABLES1738982102042 implements MigrationInterface {
    name = 'ALTERTOPPINGANDPIZZATABLES1738982102042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas" ADD "ingredients" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "toppings" ADD CONSTRAINT "UQ_697602a95a94fabc76c83b85392" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "pizzas" ADD CONSTRAINT "UQ_9138d4819c8577c4805a029427f" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas" DROP CONSTRAINT "UQ_9138d4819c8577c4805a029427f"`);
        await queryRunner.query(`ALTER TABLE "toppings" DROP CONSTRAINT "UQ_697602a95a94fabc76c83b85392"`);
        await queryRunner.query(`ALTER TABLE "pizzas" DROP COLUMN "ingredients"`);
    }

}
