import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATEPIZZASANDTOPPINGSTABLE1738784043429 implements MigrationInterface {
    name = 'CREATEPIZZASANDTOPPINGSTABLE1738784043429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "toppings" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_6a1c9185d307454dfadc29f3019" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" SERIAL NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas_toppings_toppings" ("pizzasId" integer NOT NULL, "toppingsId" integer NOT NULL, CONSTRAINT "PK_50dd80da7c10c2bed5f3c4e5996" PRIMARY KEY ("pizzasId", "toppingsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dec25acb6fa5a6042f0b0589a6" ON "pizzas_toppings_toppings" ("pizzasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d4034b1b36273bf9202957ee9d" ON "pizzas_toppings_toppings" ("toppingsId") `);
        await queryRunner.query(`ALTER TABLE "pizzas_toppings_toppings" ADD CONSTRAINT "FK_dec25acb6fa5a6042f0b0589a61" FOREIGN KEY ("pizzasId") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pizzas_toppings_toppings" ADD CONSTRAINT "FK_d4034b1b36273bf9202957ee9d5" FOREIGN KEY ("toppingsId") REFERENCES "toppings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas_toppings_toppings" DROP CONSTRAINT "FK_d4034b1b36273bf9202957ee9d5"`);
        await queryRunner.query(`ALTER TABLE "pizzas_toppings_toppings" DROP CONSTRAINT "FK_dec25acb6fa5a6042f0b0589a61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4034b1b36273bf9202957ee9d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dec25acb6fa5a6042f0b0589a6"`);
        await queryRunner.query(`DROP TABLE "pizzas_toppings_toppings"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
        await queryRunner.query(`DROP TABLE "toppings"`);
    }

}
