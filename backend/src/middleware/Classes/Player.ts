import { Answer, AnswerStruct } from "@scattegoriesgame/shared/interfaces/voting";

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

    public get answers(): AnswerStruct {
        return { username: this.username, answers: this._answers };
    }

    public get getScore() {
        return this.score;
    }

    public clearScore() {
        this.score = 0;
    }

    public pushAnswears(answers: Answer[]) {
        this._answers = [];
        console.log("Answers array :", answers);
        if (answers) {
            answers.forEach(answer => {
                this._answers.push(answer);
            });
        }
    }

    public clearAnswears() {
        this._answers = [];
    }
}