import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { House } from '../schemas/houseSchema'
import { Houses } from '../entity/Houses'



@Resolver()
export class houseResolvers {
    @Query(() => House)
    getHouseName(@Arg("house_key") house_key: string){
        return Houses.findOne({ where: { house_key } })
    }

    @Mutation(() => String)
    async createHouseWithName(
        @Arg("house_name") house_name: string,
        @Arg("house_key") house_key: string
        ){
        await Houses.insert({ house_name, house_key })
        return `${house_name} has been added to database!`
    }

    
}