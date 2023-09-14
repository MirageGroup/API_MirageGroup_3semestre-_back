import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Process from "./process.entity";

@Entity()
export default class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    requirement!: string

    @Column('datetime')
    date_created!: string

    @Column('datetime')
    date_finish!: string

    @Column()
    state!: string

    @ManyToMany(() => Process)
    processes!: Process[];

}