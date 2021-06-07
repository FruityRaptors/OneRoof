import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Chores } from '../entity/Chores'

@Resolver()
export class choreResolvers {
    @Query(() => [Chores])   
    getAllTodos(){
        return Chores.find()
    }
}