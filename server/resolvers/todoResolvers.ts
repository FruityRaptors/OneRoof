import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Todos } from '../entity/Todos'
// import { Todo } from '../schemas/todoSchema'

@Resolver()
export class todoResolvers {
    @Query(() => [Todos])   
    getAllTodos(){
        return Todos.find()
    }

    @Query(() => [Todos])
    getTodosByHouse(
        @Arg('house_key') house_key: string,
    ){
        return Todos.find( { where: { house_key } } )
    }

    //Create new Todo. Need to add category(?)
    @Mutation(() => String)
    async createTodo(
        @Arg('todo') todo: string,             //Manual input
        @Arg('date') date: string,             //Assign Automatically using JS date
        @Arg('victimid') victimid: string,     //From Assignee dropdown(?)
        @Arg('creatorid') creatorid: string,   //Automatic from user who created todo?
        @Arg('complete') complete: boolean,    //For strikethrough/highglights
        @Arg('house_key') house_key: string,   //
        @Arg('assigneeURL') assigneeURL: string,
        ){

        await Todos.insert({ todo, house_key, date, victimid, creatorid, complete, assigneeURL })
        return "New Todo Added!"
      }

    //Delete a todo by id
    @Mutation(() => String)
    async deleteTodo(
        @Arg('id') id: number, 
    ){
        await  Todos.delete( id )
        return "Todo deleted!"
    }
    //Update a todo by it's ID
    @Mutation(() => String)
    async updateTodoVictim(
        @Arg('id') id: number,
        @Arg('victimid') victimid: string,
        @Arg('assigneeURL') assigneeURL: string,
    ){
        let todoToBeUpdated = await Todos.findOne( { where: { id } })
        if(!todoToBeUpdated){
            console.log('Error!')
            return
        }

        todoToBeUpdated.victimid = victimid
        todoToBeUpdated.assigneeURL = assigneeURL

        Todos.save(todoToBeUpdated)

        return "Saved!"

    }

      //Update a todo's message
      @Mutation(() => String)
      async updateTodoMessage(
          @Arg('id') id: number,
          @Arg('todo') todo: string,
      ){
          let todoToBeUpdated = await Todos.findOne( { where: { id } })
          if(!todoToBeUpdated){
              console.log('Error!')
              return
          }
  
          todoToBeUpdated.todo = todo
  
          Todos.save(todoToBeUpdated)
  
          return "Saved!"
  
      }

}
    



