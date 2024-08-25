interface IPlayer {
    readonly username: string;
    readonly userId: string;
    readonly socketId: string;
    readonly isHost: boolean;
}

export default class Player implements IPlayer{
    constructor(
        public readonly username: string, //Shorter notation. Defines and declares simoteniously
        public readonly userId: string,
        public readonly socketId: string,
        public readonly isHost: boolean,
    ) {}
}