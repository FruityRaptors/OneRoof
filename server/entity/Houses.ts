import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Houses extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({
        length: 20
    })
    house_name: string;

    @Field(() => String)
    @Column()
    house_key: string;

    @Field(() => String)
    @Column()
    modules: string;

}