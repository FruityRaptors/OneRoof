import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Todos } from '../entity/Todo'
// import { Todo } from '../schemas/todoSchema'

@Resolver()
export class todoResolver {
    @Query(() => [Todos])   
    getAllTodos(){
        return Todos.find()
    }


    //Create new Todo. Need to add category(?)
    @Mutation(() => String)
    async createTodo(
        @Arg('todo') todo: string,             //Manual input
        @Arg('date') date: string,             //Assign Automatically using JS date
        @Arg('victimid') victimid: string,     //From Assignee dropdown(?)
        @Arg('creatorid') creatorid: string,   //Automatic from user who created todo?
        @Arg('complete') complete: boolean,    //For strikethrough/highglights
        ){

        await Todos.insert({ todo, date, victimid, creatorid, complete })
        return "New Todo Added!"
      }

    //Delete a todo by id
    @Mutation(() => String)
    async deleteTodo(
        @Arg('id') id: number, 
    ){
        await Todos.delete(id)
        return "Todo deleted!"
    }
}


