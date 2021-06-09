import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { House } from '../schemas/houseSchema'
import { Houses } from '../entity/Houses'



@Resolver()
export class modulesResolvers {
    @Mutation(() => String)
    async updateModules(
        @Arg("house_key") house_key: string,
        @Arg("modules") modules: string,
    ){
        let houseToBeUpdated = await Houses.findOne({ where: { house_key }})
        houseToBeUpdated.modules = modules

        Houses.save(houseToBeUpdated)

        return "House Modules Updated"
    }
}