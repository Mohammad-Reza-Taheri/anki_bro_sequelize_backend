// import { Request, Response } from 'express';
// import userService from '../services/user.service';

// class UserController {
//   async createUser(req: Request, res: Response) {
//     try {
//       const { name, email, password } = req.body;
//       const user = await userService.createUser(name, email, password);
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating user' });
//     }
//   }

//   async getUserById(req: Request, res: Response) {
//     try {
//       const user = await userService.getUserById(parseInt(req.params.id));
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching user' });
//     }
//   }
// }

// export default new UserController();