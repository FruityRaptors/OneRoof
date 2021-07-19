import { Resolver, Mutation, Arg } from 'type-graphql'
import { Houses } from '../entity/Houses'
import ImportedModules from '../modules.json'



@Resolver()
export class moduleResolvers {
    @Mutation(() => String)
    async updateModules(
        @Arg("house_key") house_key: string,
        @Arg("modules") modules: string,
    ){
        let modulesToBeSaved : any = ImportedModules
        let parsedModules = JSON.parse(modules)

        for (const moduleKey in parsedModules) {
            modulesToBeSaved[moduleKey].purchased = parsedModules[moduleKey].purchased
        }
   
        let houseToBeUpdated = await Houses.findOne({ where: { house_key }})
        houseToBeUpdated.modules = JSON.stringify(modulesToBeSaved)
        Houses.save(houseToBeUpdated)

        return "House Modules Updated"
    }
}