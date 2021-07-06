import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Groceries } from '../entity/Groceries'

@Resolver()
export class groceryItemResolvers {
    @Query(() => [Groceries])   
    getAllGroceryItems(){
        return Groceries.find()
    }

    @Query(() => [Groceries])
    getGroceryItemsByHouse(
        @Arg('house_key') house_key: string,
    ){
        return Groceries.find( { where: { house_key } } )
    }

    @Mutation(() => String)
    async createGroceryItem(
        @Arg('item') item: string,             
        @Arg('date') date: string,            
        @Arg('creatorid') creatorid: string,   
        @Arg('house_key') house_key: string, 
        @Arg('inCart') inCart: boolean,
        ){

        await Groceries.insert({ item, date, creatorid, house_key, inCart })
        return "New Grocery Item Added!"
      }

    //Delete a grocery item by id
    @Mutation(() => String)
    async deleteGroceryItem(
        @Arg('id') id: number, 
    ){
        await  Groceries.delete( id )
        return "Grocery Item deleted!"
    }
}
    



