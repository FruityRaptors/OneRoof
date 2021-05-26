import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import {Users} from "./Users"

@Entity()
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 200
    })
    todo: string;

    @Column()
    category: number;

    @Column({
        length: 50
    })
    house_key: string;

    @Column()
    date: string;

    @ManyToMany(() => Users)
    @JoinTable()
    victimid: Users[]

    @OneToOne(() => Users)
    creatorid: Users

} 