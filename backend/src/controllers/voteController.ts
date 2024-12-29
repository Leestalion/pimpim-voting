import { NextFunction, Request, Response } from "express";
import { voteService } from "../services";
import { tripService } from "../services";

export const vote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentHour = new Date().getHours();
    if (currentHour === 23) {
      throw new Error("Le vote est fermé entre 23h et minuit");
    }

    const trip = await tripService.getTripById(req.body.votes[0].tripId);

    if (!trip) {
      throw new Error("Voyage non trouvé");
    }

    const day = await tripService.calculateCurrentDay(trip.id);

    const votes_data = req.body.votes.map((vote: any) => ({
      ...vote,
      day: day,
    }));
    const votes = await voteService.vote(votes_data);
    res.json(votes);
  } catch (err) {
    next(err);
  }
};

export const getVotesByTripId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tripId } = req.params;
    const votes = await voteService.getVotesByTripId(tripId);
    res.json(votes);
  } catch (err) {
    next(err);
  }
};

export const getVotesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tripId, userId } = req.params;
    const votes = await voteService.getVotesByUserId(tripId, userId);
    res.json(votes);
  } catch (err) {
    next(err);
  }
};

export const deleteVotesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tripId, userId } = req.params;
    await voteService.deleteVotesByUserId(tripId, userId);
    res.json({ message: "Votes supprimés" });
  } catch (err) {
    next(err);
  }
};
