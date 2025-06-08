import User, { IUser } from "../models/User2.model"

export class UserService {
    static async createUser(username: string, email: string, password: string) {
        return await User.create({ username, email, password })
    }

    static async getAllUsers() {
        return await User.findAll()
    }

    static async getUserByEmail(email: string) {
        return await User.findOne(
            { where: { email: email } }
        )

      

    }

    static async updateUser(id: number, username: string, email: string) {
        return await User.update(
            { username: username, email: email }, // Fields to update
            { where: { id: id } } // Condition
        );

    }

    static async deleteUser(id: number) {
        return await User.destroy(
            { where: { id } }
        )
    }


}

// export default UserService