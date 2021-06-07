import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
    export class DM {
        @Field()
        id: number

        @Field()
        dm_key: string

        @Field()
        users: string
    }