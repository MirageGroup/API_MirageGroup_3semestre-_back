import { MigrationInterface, QueryRunner } from "typeorm"
import bcrypt from 'bcrypt'

export class Migrations1699116149263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO user(name, email, password, phone, cpf, roleId) VALUES 
            ("Usuário", "usuario@email.com", "${await bcrypt.hash("senha123", 10)}", "+11 (11) 11111-1111", "111.111.111-11", 1)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM user WHERE email = "usuario@email.com"`
        )
    }

}
