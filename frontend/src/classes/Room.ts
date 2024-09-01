import { RefreshPlayersResponse, RoomMate } from "./serverResponses";

export default class Room {
    private roomId: string | null = null;
    private players: RoomMate[] = [];

    public leaveRoom() {
        this.roomId = null;
        this.players = [];
    }

    public updateRoom(roomData: RefreshPlayersResponse) {
        this.roomId = roomData.id;
        this.players = roomData.players;
    }

    public get roomMates(){
        return this.players;
    }

    public get id(){
        return this.roomId;
    }
}