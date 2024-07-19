export interface Room {
    id: string,
    players: Player[],
    created: number,
}

interface Player {
    username: string,
    socketId: string,
    isAdmin?: boolean,
}