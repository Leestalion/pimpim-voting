import { db } from "../db";
import { Vote } from "../types";

export const vote = (vote: Vote) => {
  return db("votes").insert({
    trip_id: vote.tripId,
    user_id: vote.userId,
    voter_id: vote.voterId,
    rank: vote.rank,
    vote_day: vote.day,
    created_at: db.fn.now(),
  }).returning("*");
};

export const getVotesByTripId = (tripId: string) => {
  return db("votes")
    .where({ trip_id: tripId })
    .select("*");
};

export const getVotesByUserId = (tripId: string, userId: string) => {
  return db("votes")
    .where({ voter_id: userId, trip_id: tripId })
    .select("*");
};

export const deleteVotesByUserId = (tripId: string, userId: string) => {
  return db("votes")
    .where({ voter_id: userId, trip_id: tripId })
    .delete();
};