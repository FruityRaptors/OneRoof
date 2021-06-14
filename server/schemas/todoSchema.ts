import { Field, ObjectType } from 'type-graphql';

@ObjectType()
    export class Todo {
        @Field()
        id: number

        @Field()
        todo: string

        @Field()
        category: number

        @Field()
        house_key: string

        @Field()
        date: string

        @Field()
        victimid: [string]

        @Field()
        creatorid: string

        @Field()
        assigneeURL: string
    }