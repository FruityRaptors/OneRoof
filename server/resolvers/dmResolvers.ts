import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Dms } from '../entity/DM'
import { DM } from '../schemas/dmSchema'


@Resolver()
export class dmResolvers {
    @Query(() => [DM])
    getAllChat(){
        return Dms.find()
    }

    @Query(() => DM)
    async checkIfInSameDm(
        @Arg("userid1") userid1: string,
        @Arg("userid2") userid2: string
    ){

        console.log(`${userid2}/${userid1}`)
        console.log(`${userid1}/${userid2}`)

        let result1 = await Dms.findOne( { where: {users: `${userid2}/${userid1}`} } )
        if(result1){
            return result1
        } else {
            let result2 = await Dms.findOne( { where: {users: `${userid1}/${userid2}`} } )
            if (result2) {
                return result2
            }
        }
    }

    @Mutation(() => String)
    async addUsersToChat(
        @Arg("userid1") userid1: string,
        @Arg("userid2") userid2: string,
        @Arg("dm_key") dm_key: string,
    ){

        await Dms.insert({ users: `${userid1}/${userid2}`, dm_key: dm_key })

        return "success!"
    }

    
}



