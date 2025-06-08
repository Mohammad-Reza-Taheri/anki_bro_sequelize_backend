import { Request, Response } from 'express'
import { UserService } from '../services/user2.service'

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { username, email,password } = req.body
            const newUser = await UserService.createUser(username, email,password)
            res.status(200).json(newUser)
        } catch (err) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json('error in user2.controller in getAllUser fun')
        }

    }

    static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { username, email } = req.body
            const updatedUser = await UserService.updateUser(Number(id), username, email);
            res.json("Updated User is: " + updatedUser);
        } catch (err) {
            res.status(500).json('error in user2.controller in updateUser fun')
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deletedUser = await UserService.deleteUser(Number(id));
            res.send(deletedUser)
        } catch (err) {
            res.status(500).json('error in user2.controller in deleteUser fun')
        }
    }

}