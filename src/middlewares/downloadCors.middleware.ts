import { Request, Response, NextFunction } from 'express'
export const downloadCors = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Expose-Headers', 'Content-Disposition, Authorization');
    next();
};