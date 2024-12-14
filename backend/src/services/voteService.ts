import { voteModel } from "../models";
import { Vote } from "../types";

export const vote = async (voteData: Vote) => {
    const vote = await voteModel.vote(voteData);
    if (!vote) {
        throw new Error("Problem happened while voting");
    }
    return vote;
};