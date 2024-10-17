// Answers:
export interface AnswerStruct {
    username: string;
    answers: Answer[];
}

export interface Answer {
    category: string | undefined;
    answer: string | undefined;
}

// Votings responses :
export interface VotingStruct { //Answer from user to server
    username: string; // username of user who votes
    choices: ChoicesByCategory[];
}

export interface ChoicesByCategory { //Choice grouped by category
    category: string;
    answers: CategoryVotesChoices;
}

export interface CategoryVotesChoices { // Choice of user about roommates answers
    username: string; // username of rommate who answered
    answer: boolean; // Answer of user who rates answers
}