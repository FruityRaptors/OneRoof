import {Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Users extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({
        length: 20
    })
    username: string;

    @Field(() => String)
    @Column({
        length: 50
    })
    house_key: string;

    @Field(() => String)
    @Column({
        length: 30
    })
    email: string;

    @Field(() => Boolean)
    @Column()
    isAdmin: boolean;

}


