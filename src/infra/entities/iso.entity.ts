import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Process from "./process.entity";

@Entity()
export default class Iso {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @ManyToMany(() => Process, process => process.isos)
    @JoinTable({
        name: 'process_isos_iso',
        joinColumn: {
            name: 'id_iso',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name:' id_iso',
            referencedColumnName: 'id'
        }
    })
    processes!: Process[]

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @DeleteDateColumn()
    deleted_at!: Date
}