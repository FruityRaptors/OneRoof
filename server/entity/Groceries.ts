import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Groceries extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({
        length: 200
    })
    item: string;

    @Field(() => String)
    @Column()
    creatorid: string;

    @Field(() => String)
    @Column({
        length: 50
    })
    house_key: string;

    @Field(() => String)
    @Column()
    date: string;
} 