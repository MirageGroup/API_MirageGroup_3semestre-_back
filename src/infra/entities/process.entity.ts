import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Task from "./task.entity";

@Entity()
export default class Process {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column('datetime')
    date_created!: Date

    @Column('datetime')
    date_finish!: Date

    @Column()
    state!: string

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

    @ManyToMany(() => Task)
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
}