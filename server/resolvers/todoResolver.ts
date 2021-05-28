import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/userSchema'
import { Users } from '../entity/Users'
import { Todo } from '../entity/Todo'
// import { Todo } from '../schemas/todoSchema'

@Resolver()
export class todoResolver {
    @Query(() => [Todo])
    getAllTodo(){
        return Todo.find()
    }


    //Create new Todo
    @Mutation(() => String)
    async createTodo(
        @Arg('todo') todo: string,
        @Arg('house_key') house_key: string,
        @Arg('date') date: string,
        @Arg('victimid') victimid: string,
        ){
        // const victimid = await Users.findOne({where: { victimid }})

        await Todo.insert({ todo, house_key, date, victimid })
        return todo
      }

}


