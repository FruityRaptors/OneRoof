import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Chores extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({
        length: 200
    })
    chore: string;

    @Field(() => String)
    @Column({
        length: 1000,
        nullable: true
    })
    description: string;

    @Field(() => String)
    @Column({
        length: 50
    })
    house_key: string;

   /*  @Field(() => String)
    @Column()
    date: string; */

    @Field(() => String)
    @Column({
        nullable: true
    }
    )
    assignee: string;

    @Field(() => String)
    @Column()
    creatorid: string;

    @Field(() => String)
    @Column({
        nullable: true
    }
    )
    assigneeURL: string;

} 