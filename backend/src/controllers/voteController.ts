import { NextFunction, Request, Response } from "express";
import { voteService } from "../services";

function getDay() {
    return 1;
}

export const vote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const day = getDay();
        const votes_data = req.body.votes.map((vote: any) => ({
            ...vote,
            day: day
        }));
        const votes = await voteService.vote(votes_data);
        res.json(votes);
    } catch (err) {
        next(err);
    }
};

export const getVotesByTripId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tripId } = req.params;
        const votes = await voteService.getVotesByTripId(tripId);
        res.json(votes);
    } catch (err) {
        next(err);
    }
};

export const getVotesByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tripId, userId } = req.params;
        const votes = await voteService.getVotesByUserId(tripId, userId);
        res.json(votes);
    } catch (err) {
        next(err);
    }
};