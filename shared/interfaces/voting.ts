// Answers:
export interface AnswerStruct {
    username: string;
    answers: Answer[];
}

export interface Answer {
    category: string | undefined;
    answer: string | undefined;
}

// Votings :
export interface VotingStruct {
    username: string;
    choices: Choice[]
}

export interface ChoiceAnswer extends Answer {
    choice: boolean;
}

export interface Choice {
    username: string; //Username of user which answers belongs to.
    answers: ChoiceAnswer;
}