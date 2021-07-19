import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { House } from '../schemas/houseSchema'
import { Houses } from '../entity/Houses'
import Modules from '../modules.json'



@Resolver()
export class houseResolvers {
        @Query(() => House)
        getHouseName(@Arg("house_key") house_key: string){

        return Houses.findOne({ where: { house_key } })
    }

    @Mutation(() => String)
    async createHouseWithName(
        @Arg("house_name") house_name: string,
        @Arg("house_key") house_key: string,
        ){
        let modules = JSON.stringify(Modules)
        await Houses.insert({ house_name, house_key, modules })
        return `${house_name} has been added to database!`
    }
}