import { User, Vote, VotedUser } from "src/types";

export const calculateVotedUsers = (votes: Vote[], users: User[]): VotedUser[] => {
    const votedUsers: Record<string, VotedUser> = {};

    // Initialize votedUsers with default scores
    users.forEach((user) => {
        votedUsers[user.id] = { userId: user.id, username: user.username, score: 0 };
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

        // Distribute the voter's score contribution
        sortedVotes.forEach((vote, index) => {
            const weight = (totalVotes - index) / totalVotes;
            const scoreContribution = weight * maxScorePerVoter;

            if (votedUsers[vote.userId]) {
                votedUsers[vote.userId].score += scoreContribution;
            }
        });
    });

    // Convert the record to an array and return sorted by score
    return Object.values(votedUsers).sort((a, b) => b.score - a.score);
};