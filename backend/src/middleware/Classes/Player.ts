interface Answear {
    value: string | undefined;
    rate: number;
}

export default class Player {
    private score: number = 0;
    private answears: Answear[] = [];

    constructor(
        public readonly username: string,
        public readonly userId: string,
        public readonly socketId: string,
        public readonly isHost: boolean,
    ) { }

    public scoreUp(value: number) {
        this.score =+ value;
    }

    public get getScore() {
        return this.score;
    }

    public clearScore() {
        this.score = 0;
    }

    public pushAnswears(...answears: string[]) {
        answears.map(answear => {
            this.answears.push({ value: answear, rate: 0 });
        });
    }

    public clearAnswears() {
        this.answears = [];
    }
}