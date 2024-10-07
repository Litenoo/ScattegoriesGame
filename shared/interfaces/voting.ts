export interface serverVotingResponse{
    username: string;
    answers: Answer[]
}

export interface Answer {
    category: string | undefined;
    answer: string | undefined;
}