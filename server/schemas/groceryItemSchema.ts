import { Field, ObjectType } from 'type-graphql';

@ObjectType()
    export class GroceryItem {
        @Field()
        id: number

        @Field()
        item: string

        @Field()
        creatorid: string

        @Field()
        house_key: string

        @Field()
        date: string

        @Field()
        creatorURL: string
    }