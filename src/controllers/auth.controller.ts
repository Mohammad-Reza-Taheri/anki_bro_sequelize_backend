import { NextFunction, Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import { generateToken } from "../utils/jwtUtils";
import { UserService } from "../services/user2.service";
import jwt from 'jsonwebtoken'



export const register = async (req: Request, res: Response, next: NextFunction) => {
    // const { username, password } = req.body;
    // const hashedPassword = await hashPassword(password);
    // const newUser = { id: users.length + 1, username, password: hashedPassword };
    // users.push(newUser);
    // res.json({ message: "User registered successfully", user: newUser });

    ///////////////////////////////////////

    try {

        // const schema = Joi.object({
        //     name: Joi.string().min(3).max(50).required().messages({
        //         "string.min": "Less than 3 characters",
        //     }),
        //     email: Joi.string().email().required(),
        //     password: Joi.string().min(5).max(50).required(),
        // });

        // const { error } = schema.validate(req.body);
        // if (error) {
        //     // throw new ServerError(400, error.message)
        //     // console.error("Validation Error:", error.message);
        //     res.status(400).send(error.details[0].message);
        //     return
        // }

        // **Check If User Already Exists**
        const existingUser = await UserService.getUserByEmail(req.body.email);
        if (existingUser) {
            // throw new ServerError(409, "User already registered.")
            res.status(404).send("User already registered.");
            return
        }

        // **Hash Password**
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hashedPassword = await hashPassword(req.body.password)

        // **Insert New User**
        const newUser = await UserService.createUser(req.body.username, req.body.email, hashedPassword);
        console.log("new user: " + newUser)

        // console.log('inserted id: '+newUser)
        if (!newUser) {
            // throw new ServerError(500, 'Error Inserting User!')
            res.status(500).send("Error inserting user.");
            return
        }

        // **Create Token Using Inserted User ID**
        // const token = jwt.sign({ id: newUserId }, process.env.SECRET_KEY!, { expiresIn: "1h" });
        const token = generateToken(newUser.id)

        // console.log("New User ID:", newUserId);
        // console.log("Generated Token:", token);

        // **Send Token in Response Header**
        res.set("Authorization", `Bearer ${token}`);
        res.status(201).json({ message: "Registration successful", token });
        // res.send('ali')
    } catch (err) {
        next(err)
        // console.error("Registration Error:", err);
        // res.status(500).send("Internal Server Error");
    }
};








export const login = async (req: Request, res: Response) => {
    // const { username, password } = req.body;
    // const user = users.find((u) => u.username === username);
    // if (!user || !(await comparePassword(password, user.password))) {
    //     res.status(401).json({ message: "Invalid credentials" });
    //     return
    // }
    // const token = generateToken(user.id);
    // res.json({ message: "Login successful", token });


    //////////////////

    try {

        const user = await UserService.getUserByEmail(req.body.email)
        if (!user) {
            res.status(401).send("email or password is incorrect.")
            return;
        }


        // const validPassword = await bcrypt.compare(req.body.phoneNumber, user.phoneNumber)
        const validPassword = await comparePassword(req.body.password, user.password)
        if (!validPassword) {
            res.status(401).send("email or password is invalid.")
            return;
        }

        const token = generateToken(user.id);
        res.set("Authorization", `Bearer ${token}`);
        // res.send("You are login. This is your token: " + token)
        res.send("You are login.")

    } catch (err) {
        res.status(400).send("something went wrong! in login")

    }

};

export const verify_token = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
    // console.log("token is in vf:" + token)
    if (!token) {

        // res.status(401).json({ isValid: false });
        res.json({ isValid: false });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        res.json({ isValid: true, user: decoded });
    } catch (error) {
        res.json({ isValid: false });
    }

}