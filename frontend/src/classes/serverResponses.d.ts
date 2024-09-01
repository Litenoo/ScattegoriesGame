export interface RefreshPlayersResponse{    
        id:string,
        players: roomMate[],
}

export interface RoomMate{
    username: string,
    isHost:boolean,
}