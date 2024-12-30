import { NextFunction, Request, Response } from "express";
import { voteService } from "../services";
import { tripService } from "../services";
import { getCurrentDayByTripId } from "./tripController";

export const vote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const currentHour = now.getHours();

    // Determine if voting is currently open
    const isVotingClosed =
      currentHour < 6 || (currentHour >= 5 && now.getHours() < 6);

    if (isVotingClosed) {
      throw new Error("Le vote est fermé entre 5h et 6h.");
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
    const skipValidation = true;
    const voteDay = await tripService.calculateCurrentDay(tripId, skipValidation);
    await voteService.deleteVotesByUserId(tripId, userId, voteDay);
    res.json({ message: "Votes supprimés" });
  } catch (err) {
    next(err);
  }
};
