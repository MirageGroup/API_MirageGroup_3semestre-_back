import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export default class Role {
    @PrimaryColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    create_user!: boolean

    @Column()
    create_process!: boolean

    @Column()
    create_task!: boolean

    @Column()
    create_evidence!: boolean

    @Column()
    view_user!: boolean

    @Column()
    view_process!: boolean

    @Column()
    view_task!: boolean

    @Column()
    view_evidence!: boolean

    @OneToMany(() => User, user => user.role)
    users!: User[];
}