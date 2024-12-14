import { db } from "../db";
import { Vote } from "../types";

export const vote = (vote: Vote) => {
  return db("trips").insert(vote).returning("*");
};
