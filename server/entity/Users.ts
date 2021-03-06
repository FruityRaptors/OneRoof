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
        nullable: true,
        length: 20
    })
    username: string;

    @Field(() => String)
    @Column({
        nullable: true,
    })
    house_keys: string;

    @Field(() => String)
    @Column({
        length: 30
    })
    email: string;

    @Field(() => String)
    @Column({
        nullable: true,
        length: 255
    })
    photo_url: string;

    @Field(() => Boolean)
    @Column()
    isAdmin: boolean;

}


