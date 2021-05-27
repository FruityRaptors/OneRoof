import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/userSchema'
import { Users } from '../entity/Users'

@Resolver()
export class userResolvers {
    @Query(() => [User])
    getAllUsers() {
        return Users.find()
    }

    @Query(() => User)
    getUserByEmail(@Arg("email") email: string) {
        return Users.findOne({ where: { email } })
    }

    @Mutation(() => String)
    async createUser(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('isAdmin') isAdmin: boolean
        ){
        await Users.insert({email, username, isAdmin})
        return email
    }

    @Mutation(() => String)
    async addToHouse(
        @Arg('email') email: string,
        @Arg('house_key') house_key: string
    ){
        const userToBeUpdated = await Users.findOne({ where: { email }})
        if (!userToBeUpdated){
            console.error("User not found!");
            return
        }
        userToBeUpdated.house_key = house_key

        await Users.save(userToBeUpdated)

        return "Added room to user!"
    }


    // @Query(() => Book)
    // book(@Arg("id") id: string) {
    //     return Book.findOne({ where: { id } });
    // }

}

