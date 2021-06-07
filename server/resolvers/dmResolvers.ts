import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Dms } from '../entity/DM'
import { DM } from '../schemas/dmSchema'


@Resolver()
export class dmResolvers {
    @Query(() => DM)
    async checkIfInSameDm(
        @Arg("username_1") username_1: string,
        @Arg("username_2") username_2: string
    ){
        
        let searchString1 = `${username_2.toLocaleLowerCase()}/${username_1.toLocaleLowerCase()}`
        let searchString2 = `${username_1.toLocaleLowerCase()}/${username_2.toLocaleLowerCase()}`

        let findContact1 = await Dms.findOne({ where: {users: searchString1} })
        let findContact2 = await Dms.findOne({ where: {users: searchString2} })

        console.log('result.', findContact1, findContact2)

        if(findContact1){
            console.log(findContact1)
            return findContact1
        }
        if (findContact2){
            console.log(findContact2)
            return findContact2
        }
    }

    @Mutation(() => String)
    async addUsersToChat(
        @Arg("username_1") username_1: string,
        @Arg("username_2") username_2: string,
        @Arg("dm_key") dm_key: string,
    ){
        let users = `${username_1}/${username_2}`

        await Dms.insert({ users, dm_key })

        return "success!"
    }

    
}



