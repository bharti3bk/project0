import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1589688450563 implements MigrationInterface {
    name = 'initialize1589688450563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("user_name" character varying NOT NULL, "user_email" character varying NOT NULL, "time_placed" integer NOT NULL, "paper_type" character varying NOT NULL, "paper_color" character varying NOT NULL, "paper_price" integer NOT NULL, "amount" integer NOT NULL, "total" integer NOT NULL, "newsletter" boolean NOT NULL, CONSTRAINT "PK_72ff54701826cf92abe5d1948b5" PRIMARY KEY ("user_email"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`, undefined);
    }

}
