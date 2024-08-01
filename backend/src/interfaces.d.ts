export interface Room {
    id: string,
    players: Player[],
    created: number,
    categories : String[],
}

interface Player {
    username: string,
    socketId: string,
    isHost?: boolean,
}