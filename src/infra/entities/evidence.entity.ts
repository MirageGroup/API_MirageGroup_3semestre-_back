import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Task from './task.entity';

@Entity()
export default class Evidence {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    url!: string

    @ManyToOne(type => Task, task => task.evidences)
    task!: Task;

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}