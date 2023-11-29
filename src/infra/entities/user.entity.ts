import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Role from "./role.entity";
import Process from "./process.entity";
import Task from "./task.entity";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column()
    phone!: string

    @Column()
    cpf!: string

    @Column()
    password!: string

    @ManyToOne(() => Role, role => role.users, { cascade: true })
    role!: Role;

    @ManyToMany(() => Process, process => process.users)
    @JoinTable({
    name: 'process_users_user',
    joinColumn: {
      name: 'id_user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_process',
      referencedColumnName: 'id',
    },
    })
    processes!: Process[];

    @ManyToMany(() => Task, task => task.users)
    @JoinTable({ 
      name: 'task_users_user',
      joinColumn: {
        name: 'id_task',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'id_user',
        referencedColumnName: 'id'
      }
    })
    tasks!: Task[];

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}