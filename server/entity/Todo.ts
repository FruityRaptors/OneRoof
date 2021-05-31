import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinTable, BaseEntity} from "typeorm";
import { Users } from "./Users"
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Todos extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({
        length: 200
    })
    todo: string;

    // @Field(() => Number)
    // @Column()
    // category: number;

    // @Field(() => String)
    // @Column({
    //     length: 50
    // })
    // house_key: string;

    @Field(() => String)
    @Column()
    date: string;

    @Field(() => String)
    // @OneToOne(() => Users)
    // victimid: Users["username"]
    @Column()
    victimid: string;

    @Field(() => String)
    // @OneToOne(() => Users)
    // creatorid: Users["username"]
    @Column()
    creatorid: string;

    @Field(() => Boolean)
    @Column()
    complete: boolean;

} 