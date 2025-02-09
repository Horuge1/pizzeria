import { MigrationInterface, QueryRunner } from "typeorm";

export class ADDNAMEPRICEIMAGETOPIZZASTABLE1738784329811 implements MigrationInterface {
    name = 'ADDNAMEPRICEIMAGETOPIZZASTABLE1738784329811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pizzas" ADD "imageUrl" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pizzas" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "pizzas" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "pizzas" DROP COLUMN "name"`);
    }

}
