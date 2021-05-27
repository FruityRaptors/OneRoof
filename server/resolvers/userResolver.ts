import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/userSchema'
import { Users } from '../entity/Users'

@Resolver()
export class userResolver {
    @Query(() => [User])
    getAllUser(){
        return Users.find()
    }

}
