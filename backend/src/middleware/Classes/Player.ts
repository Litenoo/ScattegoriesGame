import AnswerInput from "@/middleware/Classes/AnswearInput"
import { Answer, serverVotingResponse } from "shared/interfaces/voting";

export default class Player {
    private score: number = 0;
    private _answers: Answer[] = [];

    constructor(
        public readonly username: string,
        public readonly userId: string,
        public readonly socketId: string,
        public readonly isHost: boolean,
    ) { }

    public scoreUp(value: number) {
        this.score = + value;
    }

    public get answers(): serverVotingResponse {
        return {username: this.username, answers: this._answers};
    }

    public get getScore() {
        return this.score;
    }

    public clearScore() {
        this.score = 0;
    }

    public pushAnswears(...answears: AnswerInput[]) {
        answears.map(answear => {
            this._answers.push({ answer: answear.answear, category: answear.category}); //change answear to answer
        });
    }

    public clearAnswears() {
        this._answers = [];
    }
}