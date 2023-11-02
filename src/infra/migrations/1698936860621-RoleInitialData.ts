import { MigrationInterface, QueryRunner } from "typeorm"

export class RoleInitialData1698936860621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO role(id, name, create_user, create_process, create_task, create_evidence, view_user, view_process, view_task, view_evidence) VALUES 
            (1, "tech-lead", false, false, true, true, false, true, true, true),
            (2, "c_level", false, false, false, false, true, true, true, true),
            (3, "director", true, true, true, true, true, true, true, true ),
            (4, "colaborator", false, false, false, true, false, true, true, true);`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM role`
        )
    }

}
