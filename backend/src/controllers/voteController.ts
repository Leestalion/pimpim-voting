import { NextFunction, Request, Response } from "express";
import { voteService } from "../services";

export const vote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await voteService.vote(req.body);
        res.json(users);
    } catch (err) {
        next(err);
    }
};