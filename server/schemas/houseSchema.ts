const { Field, ObjectType, InputType } = require('type-graphql');

@ObjectType()
    class House {
        @Field()
        id: number

        @Field()
        house_name: string

        @Field()
        house_key: string
    }


    module.exports = { House };