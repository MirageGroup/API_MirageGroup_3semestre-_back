import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export default class Role {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    permission!: boolean

    @OneToMany(() => User, user => user.role)
    users!: User[];
}