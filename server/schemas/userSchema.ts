import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
    export class User {
        @Field()
        id: number

        @Field()
        username: string

        @Field(() => String, { nullable: true })
        house_keys: string

        @Field()
        email: string

        @Field()
        isAdmin: boolean
    }