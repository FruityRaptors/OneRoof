import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/userSchema'

@Resolver((of) => User)
export class userResolver {
    private users: User[] = []


    @Query((returns) => [User], { nullable: true })
    async getUsers(): Promise<User[]> {
        return await this.users
    }
}