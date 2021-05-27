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

}


