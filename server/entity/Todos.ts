import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
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

    @Field(() => String)
    @Column({
        nullable: true
    }
    )
    assigneeURL: string;

    @Field(() => String)
    @Column({
        length: 50
    })
    house_key: string;

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