import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity";
import Task from "./task.entity";
import Iso from "./iso.entity";

@Entity()
export default class Process {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @Column('date')
    deadline!: Date
    
    @Column()
    state!: string

    @ManyToMany(() => Iso, iso => iso.processes, { cascade: true })
    @JoinTable({
        name: 'process_isos_iso',
        joinColumn: {
            name: 'id_process',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'id_iso',
            referencedColumnName: 'id'
        }        
    })
    isos!: Iso[]
    
    @ManyToMany(() => User, user => user.processes, { cascade: true })
    @JoinTable({
        name: 'process_users_user',
        joinColumn: {
            name: 'id_process',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'id_user',
            referencedColumnName: 'id',
        },
    })
    users!: User[];

    @ManyToMany(() => Task, { cascade: true })
    @JoinTable({
        name: 'process_tasks_task',
        joinColumn: {
            name: 'id_process',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'id_task',
            referencedColumnName: 'id',
        },
    })
    tasks!: Task[];
    
    @DeleteDateColumn()
    deleted_at!: Date
}