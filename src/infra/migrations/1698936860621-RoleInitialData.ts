import { MigrationInterface, QueryRunner } from "typeorm"

export class RoleInitialData1698936860621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO role(id, name, create_user, create_process, create_task, create_evidence, view_user, view_process, view_task, view_evidence) VALUES 
            (1, "C-Level", false, false, false, false, true, true, true, true),
            (2, "Diretor/Gestor", true, true, true, true, true, true, true, true ),
            (3, "Tech Lead", false, false, true, true, false, true, true, true),
            (4, "Colaborador", false, false, false, true, false, true, true, true);`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM role`
        )
    }

}
