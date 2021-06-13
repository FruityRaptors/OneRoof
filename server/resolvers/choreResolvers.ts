import { Query, Resolver, Mutation, Arg, } from 'type-graphql'
import { Chores } from '../entity/Chores'

@Resolver()
export class choreResolvers {
    @Query(() => [Chores])
    getAllChores() {
        return Chores.find()
    }

    @Query(() => [Chores])
    getChoresByHouse(
        @Arg('house_key') house_key: string,
    ) {
        return Chores.find({ where: { house_key } })
    }

    @Mutation(() => String)
    createChore(
        @Arg('chore') chore: string,
        @Arg('description') description: string,
        @Arg('assignee') assignee: string,
        @Arg('creatorid') creatorid: string,
        @Arg('house_key') house_key: string,
        @Arg('assigneeURL') assigneeURL: string,
    ) {

        Chores.insert({ chore, house_key, description, assignee, creatorid, assigneeURL })
        return "New chore Added!"
    }

    @Mutation(() => String)
    async deleteChore(
        @Arg('id') id: number,
    ) {
        await Chores.delete(id)
        return "Chore deleted!"
    }

    @Mutation(() => String)
    async updateChoreAssignee(
        @Arg('id') id: number,
        @Arg('newAssignee') newAssignee: string,
        @Arg('assigneeURL') assigneeURL: string,
    ) {
        let choreToBeUpdated = await Chores.findOne({ where: { id } })
        if (!choreToBeUpdated) {
            console.log('Error!')
            return
        }
        choreToBeUpdated.assignee = newAssignee
        choreToBeUpdated.assigneeURL = assigneeURL
        Chores.save(choreToBeUpdated)
        return "Saved!"
    }
}