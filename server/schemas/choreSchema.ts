import { Field, ObjectType } from 'type-graphql';

@ObjectType()
    export class Todo {
        @Field()
        id: number

        @Field()
        chore: string

        @Field()
        description: number

        @Field()
        house_key: string

        @Field()
        asignee: string

        @Field()
        creatorid: string
    }