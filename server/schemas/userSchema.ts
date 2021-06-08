import { Field, ObjectType, } from 'type-graphql';

@ObjectType()
    export class User {
        @Field(() => Number)
        id: number

        @Field(() => String, { nullable: true })
        username: string

        @Field(() => String, { nullable: true })
        house_keys: string

        @Field(() => String)
        email: string

        @Field(() => String, { nullable: true, })
        photo_url: string

        @Field(() => Boolean)
        isAdmin: boolean
    }