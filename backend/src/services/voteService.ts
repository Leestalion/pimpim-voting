import { tripService } from ".";
import { voteModel } from "../models";
import { Vote } from "../types";

export const vote = async (votesData: Vote[]) => {
  const tripId = votesData[0].tripId;
  const voterId = votesData[0].voterId;
  const voteDay = votesData[0].day;
  await voteModel.deleteVotesByUserId(tripId, voterId, voteDay);
  const votes = await Promise.all(
    votesData.map((vote) => voteModel.vote(vote))
  );
  if (!votes) {
    throw new Error("Un problème est survenu lors du vote");
  }
  const flattenVotes = votes.flat();
  return flattenVotes;
};

export const getVotesByTripId = async (tripId: string) => {
  const votes = await voteModel.getVotesByTripId(tripId);
  if (!votes) {
    throw new Error(
      "Un problème est survenu lors de la récupération des votes"
    );
  }
  return votes;
};

export const getVotesByUserId = async (tripId: string, userId: string) => {
  const votes = await voteModel.getVotesByUserId(tripId, userId);
  if (!votes) {
    throw new Error(
      "Un problème est survenu lors de la récupération des votes"
    );
  }
  return votes;
};

export const deleteVotesByUserId = async (tripId: string, userId: string, voteDay: number) => {
  await voteModel.deleteVotesByUserId(tripId, userId, voteDay);
  return { message: "Votes supprimés" };
};
