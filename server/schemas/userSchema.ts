import { Field, ObjectType, } from 'type-graphql';

@ObjectType()
    export class User {
        @Field()
        id: number

        @Field(() => String, { nullable: true })
        username: string

        @Field(() => String, { nullable: true })
        house_keys: string

        @Field()
        email: string

        @Field(() => String, { nullable: true, })
        photo_url: string

        @Field()
        isAdmin: boolean
    }