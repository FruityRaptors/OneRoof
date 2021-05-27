import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/userSchema'
import { Users } from '../entity/Users'

@Resolver()
export class userResolvers {
    @Query(() => [User])
    getAllUser() {
        return Users.find()
    }

    @Query(() => User)
    getUserByEmail(@Arg("email") email: string) {
        return Users.findOne({ where: { email } })
    }


    // @Query(() => Book)
    // book(@Arg("id") id: string) {
    //     return Book.findOne({ where: { id } });
    // }

}

