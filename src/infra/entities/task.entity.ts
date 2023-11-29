import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity";
import Process from "./process.entity";
import Evidence from './evidence.entity';

@Entity()
export default class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    has_evidence!: boolean

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @Column('date')
    deadline!: Date

    @Column()
    state!: string

    @Column()
    priority!: string

    @Column()
    list_index!: number

    @ManyToMany(() => Process)
    processes!: Process[];

    @OneToMany(() => Evidence, evidence => evidence.task)
    evidences!: Evidence[]

    @ManyToMany(() => User, user => user.tasks)
    @JoinTable({
        name: 'task_users_user',
        joinColumn: {
            name: 'id_user',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'id_task',
            referencedColumnName: 'id'
        }
    })
    users!: User[]

    @DeleteDateColumn()
    deleted_at!: Date
}