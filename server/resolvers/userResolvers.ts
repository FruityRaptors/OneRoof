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

    @Mutation(() => Boolean)
    async createUser(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('house_key', () => String, { nullable: true }) house_key: string,
        @Arg('isAdmin') isAdmin: boolean
        ){
        await Users.insert({email, username, house_key, isAdmin})
        return true
    }

    @Mutation(() => Boolean)
    async addToHouse(
        @Arg('email') email: string,
        @Arg('house_key') house_key: string
    ) {
        const userToBeUpdated = await Users.findOne({ where: { email }})
        if (!userToBeUpdated){
            console.error("User not found!");
            return
        }
        userToBeUpdated['house_key'] = house_key

        await Users.update()

        return true
    }


    // @Query(() => Book)
    // book(@Arg("id") id: string) {
    //     return Book.findOne({ where: { id } });
    // }

}

