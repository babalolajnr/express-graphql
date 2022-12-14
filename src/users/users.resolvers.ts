import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput } from "./users.schema";

@Resolver(() => User)
export class UserResolver {
    private users: User[] = [
        { id: 1, name: "John Doe", email: "johndoe@gmail.com" },
        { id: 2, name: "Jane Doe", email: "janedoe@gmail.com" },
        { id: 3, name: "Mike Doe", email: "mikedoe@gmail.com" },
    ];

    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.users
    }

    @Query(() => User)
    async getUser(@Arg("id") id: number): Promise<User | undefined> {
        const user = this.users.find(u => u.id === id)
        return user
    }

    @Mutation(() => User)
    async updateUser(
        @Arg("id") id: number,
        @Arg("input") input: UserInput
    ): Promise<User> {
        const user = this.users.find(u => u.id === id)
        
        if (!user) {
            throw new Error("User not found")
        }

        const updatedUser = {
            ...user,
            ...input,
        }

        this.users = this.users.map(u => (u.id === id ? updatedUser : u))

        return updatedUser
    }

    
}