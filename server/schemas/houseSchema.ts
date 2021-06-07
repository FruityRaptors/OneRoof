import { Field, ObjectType} from 'type-graphql';

@ObjectType()
    export class House {
        @Field()
        id: number

        @Field()
        house_name: string

        @Field()
        house_key: string
    }