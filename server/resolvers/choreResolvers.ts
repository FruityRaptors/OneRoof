import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Chores } from '../entity/Chores'

@Resolver()
export class choreResolvers {
    @Query(() => [Chores])   
    getAllChores(){
        return Chores.find()
    }

    @Query(() => [Chores])
    getChoresByHouse(
        @Arg('house_key') house_key: string,
    ){
        return Chores.find( { where: { house_key } } )
    }

    @Mutation(() => String)
    createChore(
        @Arg('chore') chore: string,             
        @Arg('description') description: string,        
        @Arg('asignee') asignee: string,     
        @Arg('creatorid') creatorid: string,   
        @Arg('house_key') house_key: string,   
        ){

        Chores.insert({ chore, house_key, description, asignee, creatorid,})
        return "New chore Added!"
      }
}