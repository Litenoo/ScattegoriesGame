export default class Player {
    private username: string;
    private userId: string;
    private socketId: string;
    private isHost: boolean;

    constructor(username: string, userId: string, socketId: string, isHost: boolean) {
        this.username = username;
        this.userId = userId;
        this.socketId = socketId;
        this.isHost = isHost;
    }

    public get getUsername(): string {
        return this.username;
    }

    public get getUserId(): string{
        return this.userId;
    }

    public get getSocketId(): string{
        return this.socketId;
    }

    public get getIsHost(): boolean{
        return this.isHost;
    }
}