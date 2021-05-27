import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
    export class User {
        @Field()
        id: number

        @Field()
        username: string

        @Field()
        house_key: string

        @Field()
        email: string

        @Field()
        isAdmin: boolean
    }