import e from 'express'
import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Todos } from '../entity/Todo'
// import { Todo } from '../schemas/todoSchema'

@Resolver()
export class todoResolver {
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
        ){

        await Todos.insert({ todo, house_key, date, victimid, creatorid, complete })
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
    async updateTodo(
        @Arg('id') id: number,
        @Arg('victimid') victimid: string,
    ){
        console.log("HEre NOW")
        let todoToBeUpdated = await Todos.findOne( { where: { id } })
        if(!todoToBeUpdated){
            console.log('Error!')
            return
        }
        console.log('HELLOOOOOOOOOO', todoToBeUpdated.victimid)

        todoToBeUpdated.victimid = victimid

        Todos.save(todoToBeUpdated)

        return "Saved!"
        // if(JSON.parse(todoToBeUpdated.victimid)) {
        //     let victimIdArr = JSON.parse(todoToBeUpdated.victimid)
        //     victimIdArr.push(victimid)
        //     todoToBeUpdated.victimid = victimIdArr
        //    Todos.save(todoToBeUpdated)
        //    return "Saved!"
        // } else {
        //     todoToBeUpdated.victimid = JSON.stringify([victimid])
        //     Todos.save(todoToBeUpdated)
        //     return "Saved!"
        // }

    }

}
    



