export interface Room {
    id: string,
    players: Player[],
    created: number,
    categories : String[],
}

interface Player {
    username: string,
    userId: string,
    socketId: string, //Check if socket id is any needed and if it is ok to use it
    isHost?: boolean,
}