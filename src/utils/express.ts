import { Request } from "express";

export interface AuthRequest extends Request {
    userData?: any; // Replace `any` with a more specific type if needed
}
