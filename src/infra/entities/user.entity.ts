import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "./role.entity";
import Process from "./process.entity";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @ManyToOne(() => Role, role => role.users)
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
}