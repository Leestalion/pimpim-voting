import { User, Vote, VotedUser } from "src/types";

export const calculateVotedUsers = (
  votes: Vote[],
  users: User[]
): VotedUser[] => {
  const votedUsers: Record<string, VotedUser> = {};

  // Initialize votedUsers with default scores
  users.forEach((user) => {
    votedUsers[user.id] = {
      userId: user.id,
      username: user.username,
      score: 0,
      day: 0,
    };
  });

  const maxScorePerVoter = 10; // Fixed total score contribution per voter

  // Group votes by voterId
  const votesByVoter = votes.reduce((acc, vote) => {
    acc[vote.voterId] = acc[vote.voterId] || [];
    acc[vote.voterId].push(vote);
    return acc;
  }, {} as Record<string, Vote[]>);

  // Process each voter's votes
  Object.values(votesByVoter).forEach((userVotes) => {
    const sortedVotes = userVotes.sort((a, b) => a.rank - b.rank);
    const totalVotes = sortedVotes.length;

    // Calculate raw weights
    const rawWeights = sortedVotes.map((_, index) => (totalVotes - index) / totalVotes);
    const totalWeight = rawWeights.reduce((sum, weight) => sum + weight, 0);

    // Normalize weights
    const normalizedWeight = rawWeights.map((weight) => weight / totalWeight);

    // Distribute the voter's score contribution
    sortedVotes.forEach((vote, index) => {
      const scoreContribution = normalizedWeight[index] * maxScorePerVoter;

      if (votedUsers[vote.userId] && vote.day >= 1) {
        votedUsers[vote.userId].score += scoreContribution;
      }
    });
  });

  // Convert the record to an array and return sorted by score
  return Object.values(votedUsers).sort((a, b) => b.score - a.score);
};


export const calculateVotedUsersForDay = (
  votes: Vote[],
  users: User[],
  targetDay: number
): VotedUser[] => {
  const votedUsers: Record<string, VotedUser> = {};

  // Initialize votedUsers with default scores
  users.forEach((user) => {
    votedUsers[user.id] = {
      userId: user.id,
      username: user.username,
      score: 0,
      day: targetDay,
    };
  });

  const maxScorePerVoter = 10; // Fixed total score contribution per voter

  // Filter votes for the target day
  const votesForDay = votes.filter((vote) => vote.day === targetDay);

  // Group votes by voterId
  const votesByVoter = votesForDay.reduce((acc, vote) => {
    acc[vote.voterId] = acc[vote.voterId] || [];
    acc[vote.voterId].push(vote);
    return acc;
  }, {} as Record<string, Vote[]>);

  // Process each voter's votes
  Object.values(votesByVoter).forEach((userVotes) => {
    const sortedVotes = userVotes.sort((a, b) => a.rank - b.rank);
    const totalVotes = sortedVotes.length;

    // Calculate raw weights
    const rawWeights = sortedVotes.map((_, index) => (totalVotes - index) / totalVotes);
    const totalWeight = rawWeights.reduce((sum, weight) => sum + weight, 0);

    // Normalize weights
    const normalizedWeight = rawWeights.map((weight) => weight / totalWeight);

    // Distribute the voter's score contribution
    sortedVotes.forEach((vote, index) => {
      const scoreContribution = normalizedWeight[index] * maxScorePerVoter;

      if (votedUsers[vote.userId]) {
        votedUsers[vote.userId].score += scoreContribution;
      }
    });
  });

  // Convert the record to an array and return sorted by score
  return Object.values(votedUsers).sort((a, b) => b.score - a.score);
};